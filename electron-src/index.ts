import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { BrowserWindow, type IpcMainEvent, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import keytar from "keytar";

// Constants
const SERVICE_NAME = "claude-token-counter";
const HISTORY_FILE_PATH = join(app.getPath("userData"), "token-history.json");
const MAX_HISTORY_ITEMS = 100;
const ACCOUNT_NAME = "api-key";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    height: 840,
    width: 1200,
    frame: false,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 16, y: 16 },
    minHeight: 580,
    minWidth: 660,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
// biome-ignore lint/suspicious/noExplicitAny:
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});

// 履歴の保存と取得
// biome-ignore lint/suspicious/noExplicitAny:
ipcMain.handle("save-history", async (_, item: any) => {
  try {
    let history = [];
    try {
      const data = await readFile(HISTORY_FILE_PATH, "utf-8");
      history = JSON.parse(data);
      // biome-ignore lint/suspicious/noExplicitAny:
    } catch (error: any) {
      // ファイルが存在しない場合は空の配列を使用
      if (error.code !== "ENOENT") {
        console.error("Failed to read history file:", error);
      }
      history = [];
    }

    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    history = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    await writeFile(HISTORY_FILE_PATH, JSON.stringify(history), "utf-8");
    return history;
  } catch (error) {
    console.error("Failed to save history:", error);
    throw error;
  }
});

ipcMain.handle("clear-history", async () => {
  try {
    await writeFile(HISTORY_FILE_PATH, JSON.stringify([]), "utf-8");
  } catch (error) {
    console.error("Failed to clear history:", error);
    throw error;
  }
});

ipcMain.handle("get-history", async () => {
  try {
    const data = await readFile(HISTORY_FILE_PATH, "utf-8");
    return JSON.parse(data);
    // biome-ignore lint/suspicious/noExplicitAny:
  } catch (error: any) {
    // ファイルが存在しない場合は空の配列を返す
    if (error.code === "ENOENT") {
      return [];
    }
    console.error("Failed to get history:", error);
    throw error;
  }
});

// API Key管理のためのIPC通信ハンドラー
ipcMain.handle("save-api-key", async (_, apiKey: string) => {
  try {
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, apiKey);
  } catch (error) {
    console.error("Failed to save API key:", error);
    throw error;
  }
});

ipcMain.handle("get-api-key", async () => {
  try {
    return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
  } catch (error) {
    console.error("Failed to get API key:", error);
    throw error;
  }
});

ipcMain.handle("delete-api-key", async () => {
  try {
    await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
  } catch (error) {
    console.error("Failed to delete API key:", error);
    throw error;
  }
});

// トークンカウント
ipcMain.handle("count-tokens", async (_, text: string, model: string) => {
  try {
    const apiKey = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
    if (!apiKey) {
      throw new Error("API key is not set");
    }

    const anthropic = new Anthropic({
      apiKey,
    });

    const result = await anthropic.beta.messages.countTokens({
      model,
      messages: [{ role: "user", content: text }],
    });

    return result.input_tokens;
  } catch (error) {
    console.error("Failed to count tokens:", error);
    throw error;
  }
});
