// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import keytar from 'keytar';

// Constants
const SERVICE_NAME = 'claude-token-counter';
const ACCOUNT_NAME = 'api-key';

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});

// API Key管理のためのIPC通信ハンドラー
ipcMain.handle('save-api-key', async (_, apiKey: string) => {
  try {
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, apiKey);
  } catch (error) {
    console.error('Failed to save API key:', error);
    throw error;
  }
});

ipcMain.handle('get-api-key', async () => {
  try {
    return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
  } catch (error) {
    console.error('Failed to get API key:', error);
    throw error;
  }
});

ipcMain.handle('delete-api-key', async () => {
  try {
    await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
  } catch (error) {
    console.error('Failed to delete API key:', error);
    throw error;
  }
});
