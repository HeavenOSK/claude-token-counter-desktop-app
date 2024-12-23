import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Model, MODELS } from '../interfaces/model';
import { HistoryPanel } from '../components/HistoryPanel';
import { useTokenHistory } from '../hooks/useTokenHistory';
import { keychainUtils } from '../utils/keychain';

const IndexPage = () => {
  const [model, setModel] = useState<Model>(MODELS[0]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const { history, addHistoryItem, clearHistory } = useTokenHistory();

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const apiKey = await keychainUtils.getApiKey();
        setHasApiKey(!!apiKey);
      } catch (error) {
        console.error('Failed to check API key:', error);
        setHasApiKey(false);
      }
    };
    checkApiKey();
  }, []);

  const countTokens = async () => {
    if (!text || isLoading || !hasApiKey) return;

    setIsLoading(true);
    try {
      const count = await window.electron.countTokens(text, model);
      setTokenCount(count);
      await addHistoryItem({
        model,
        text,
        tokenCount: count,
      });
    } catch (error) {
      console.error('Failed to count tokens:', error);
      alert('Failed to count tokens. Please make sure your API key is set correctly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      <main className="p-8 flex flex-col items-center min-w-0 flex-1 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">
            Claude Token Counter
          </h1>
          
          <div className="flex gap-4 mb-6 text-sm text-gray-600">
            <a
              href="https://docs.anthropic.com/en/docs/build-with-claude/token-counting"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900"
              >
              <Image src="/globe.svg" alt="Docs" width={14} height={14} />
              Token counting API docs
            </a>
            <a
              href="https://github.com/HeavenOSK/claude-token-counter-desktop-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900"
              >
              <Image src="/globe.svg" alt="GitHub" width={14} height={14} />
              View source on GitHub
            </a>
          </div>
    
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as Model)}
            className="w-full p-2 mb-6 border rounded-lg font-mono"
            >
            {MODELS.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>

          <textarea
            className="w-full h-64 p-4 border rounded-lg mb-4 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            />
          
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={countTokens}
              disabled={isLoading || !text || !hasApiKey}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
              {isLoading ? 'Counting...' : 'Count Tokens'}
            </button>
            
            {!hasApiKey && (
              <p className="text-red-500">
                Please set your API key in the settings to use the token counter.
              </p>
            )}
            
            {tokenCount !== null && (
              <p className="text-lg">
                Token count: <span className="font-bold">{tokenCount}</span>
              </p>
            )}
          </div>
        </div>      
      </main>
      <HistoryPanel history={history} onClear={clearHistory} />
    </div>
  );
};

export default IndexPage;
