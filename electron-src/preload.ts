/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { contextBridge, ipcRenderer } from 'electron';
import type { IpcRendererEvent } from 'electron/main';

const MODELS = [
  'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku-20241022',
  'claude-3-opus-20240229',
] as const;

type Model = (typeof MODELS)[number];
type TokenCountHistory = {
  id: string;
  timestamp: string;
  model: Model;
  text: string;
  tokenCount: number;
};
// We are using the context bridge to securely expose NodeAPIs.
// Please note that many Node APIs grant access to local system resources.
// Be very cautious about which globals and APIs you expose to untrusted remote content.
contextBridge.exposeInMainWorld('electron', {
  sayHello: () => ipcRenderer.send('message', 'hi from next'),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  receiveHello: (handler: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on('message', handler),
  stopReceivingHello: (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    handler: (event: IpcRendererEvent, ...args: any[]) => void,
  ) => ipcRenderer.removeListener('message', handler),
  // API Key管理
  saveApiKey: (apiKey: string) => ipcRenderer.invoke('save-api-key', apiKey),
  getApiKey: () => ipcRenderer.invoke('get-api-key'),
  deleteApiKey: () => ipcRenderer.invoke('delete-api-key'),
  // トークンカウント
  countTokens: (text: string, model: string) =>
    ipcRenderer.invoke('count-tokens', text, model),
  // 履歴管理
  saveHistory: (item: Omit<TokenCountHistory, 'id' | 'timestamp'>) =>
    ipcRenderer.invoke('save-history', item),
  getHistory: () => ipcRenderer.invoke('get-history'),
  clearHistory: () => ipcRenderer.invoke('clear-history'),
});
