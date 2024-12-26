export const keychainUtils = {
  /**
   * API Keyを保存します
   */
  saveApiKey: async (apiKey: string): Promise<void> => {
    try {
      await window.electron.saveApiKey(apiKey);
    } catch (error) {
      console.error('Failed to save API key:', error);
      throw error;
    }
  },

  /**
   * 保存されているAPI Keyを取得します
   */
  getApiKey: async (): Promise<string | null> => {
    try {
      return await window.electron.getApiKey();
    } catch (error) {
      console.error('Failed to get API key:', error);
      throw error;
    }
  },

  /**
   * 保存されているAPI Keyを削除します
   */
  deleteApiKey: async (): Promise<void> => {
    try {
      await window.electron.deleteApiKey();
    } catch (error) {
      console.error('Failed to delete API key:', error);
      throw error;
    }
  },
};
