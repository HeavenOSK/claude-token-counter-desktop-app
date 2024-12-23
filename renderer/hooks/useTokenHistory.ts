import { useState, useEffect } from 'react';
import { TokenCountHistory } from '../interfaces/history';

export const useTokenHistory = () => {
  const [history, setHistory] = useState<TokenCountHistory[]>([]);

  useEffect(() => {
    // 初期ロード時に履歴を取得
    window.electron.getHistory().then(setHistory).catch(console.error);
  }, []);

  const addHistoryItem = async (item: Omit<TokenCountHistory, 'id' | 'timestamp'>) => {
    try {
      const updatedHistory = await window.electron.saveHistory(item);
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  return {
    history,
    addHistoryItem,
  };
};
