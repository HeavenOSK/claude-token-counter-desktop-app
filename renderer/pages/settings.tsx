import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { keychainUtils } from '../utils/keychain';

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const [hasStoredKey, setHasStoredKey] = useState(false);

  const maskApiKey = (key: string) => {
    const visibleLength = Math.ceil(key.length * 0.2); // 20%を表示
    const visiblePart = key.slice(0, visibleLength); // 先頭の20%
    const maskedPart = '*'.repeat(key.length - visibleLength); // 残りを*で埋める
    return visiblePart + maskedPart;
  };

  useEffect(() => {
    const checkStoredKey = async () => {
      try {
        const savedApiKey = await keychainUtils.getApiKey();
        setHasStoredKey(!!savedApiKey);
      } catch (error) {
        console.error('API Key の確認に失敗しました:', error);
      }
    };
    checkStoredKey();
  }, []);

  const handleSave = async () => {
    try {
      await keychainUtils.saveApiKey(apiKey);
      setMessage('API Key を保存しました');
      setApiKey('');
      setHasStoredKey(true);
    } catch (error) {
      setMessage('API Key の保存に失敗しました');
      console.error(error);
    }
  };

  const handleTest = async () => {
    try {
      const savedApiKey = await keychainUtils.getApiKey();
      if (savedApiKey) {
        setMessage(`保存されている API Key: ${maskApiKey(savedApiKey)}`);
      } else {
        setMessage('API Key が保存されていません');
      }
    } catch (error) {
      setMessage('API Key の取得に失敗しました');
      console.error(error);
    }
  };

  return (
    <Layout title="Settings">
      <div className="settings-container">
        <h1>設定</h1>
        
        <div className="form-group">
          <label htmlFor="apiKey">API Key</label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API Key"
          />
        </div>

        <div className="button-group">
          <button 
            onClick={handleSave} 
            className="save-button"
            disabled={hasStoredKey && !apiKey}
          >
            {hasStoredKey && !apiKey ? '保存済み' : '保存'}
          </button>
          <button onClick={handleTest} className="test-button">
            保存確認
          </button>
        </div>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <style jsx>{`
          .settings-container {
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
          }

          input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
          }

          .button-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.2s;
          }

          button:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
            opacity: 0.65;
          }

          .save-button {
            background-color: #007bff;
            color: white;
          }

          .save-button:hover:not(:disabled) {
            background-color: #0056b3;
          }

          .test-button {
            background-color: #6c757d;
            color: white;
          }

          .test-button:hover {
            background-color: #545b62;
          }

          .message {
            padding: 10px;
            border-radius: 4px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default SettingsPage;
