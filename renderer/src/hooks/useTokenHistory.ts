import { useEffect, useState } from "react";
import type { TokenCountHistory } from "../interfaces/history";

export const useTokenHistory = () => {
  const [history, setHistory] = useState<TokenCountHistory[]>([]);

  useEffect(() => {
    // 初期ロード時に履歴を取得
    window.electron.getHistory().then(setHistory).catch(console.error);
  }, []);

  const addHistoryItem = async (
    item: Omit<TokenCountHistory, "id" | "timestamp">,
  ) => {
    try {
      const updatedHistory = await window.electron.saveHistory(item);
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  const clearHistory = async () => {
    try {
      await window.electron.clearHistory();
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  return {
    history,
    addHistoryItem,
    clearHistory,
  };
};
