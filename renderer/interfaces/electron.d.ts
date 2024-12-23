import { Model } from './model';
import { TokenCountHistory } from './history';

export interface IElectron {
  sayHello: () => void;
  receiveHello: (handler: (event: any, ...args: any[]) => void) => void;
  stopReceivingHello: (handler: (event: any, ...args: any[]) => void) => void;
  // API Key管理
  saveApiKey: (apiKey: string) => Promise<void>;
  getApiKey: () => Promise<string | null>;
  deleteApiKey: () => Promise<void>;
  // トークンカウント
  countTokens: (text: string, model: Model) => Promise<number>;
  // 履歴管理
  saveHistory: (item: Omit<TokenCountHistory, 'id' | 'timestamp'>) => Promise<TokenCountHistory[]>;
  getHistory: () => Promise<TokenCountHistory[]>;
  clearHistory: () => Promise<void>;
}

declare global {
  interface Window {
    electron: IElectron;
  }
}
