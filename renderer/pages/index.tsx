import { useState } from 'react';
import Image from 'next/image';
import { Model, MODELS } from '../interfaces/model';

const IndexPage = () => {
  const [model, setModel] = useState<Model>(MODELS[0]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenCount, setTokenCount] = useState<number | null>(null);

  const countTokens = async () => {
    if (!text || isLoading) return;

    setIsLoading(true);
    try {
      const count = await window.electron.countTokens(text, model);
      setTokenCount(count);
    } catch (error) {
      console.error('Failed to count tokens:', error);
      alert('Failed to count tokens. Please make sure your API key is set correctly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl pr-[240px]">
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
            href="https://github.com/HeavenOSK/claude-token-counter"
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
            disabled={isLoading || !text}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Counting...' : 'Count Tokens'}
          </button>
          
          {tokenCount !== null && (
            <p className="text-lg">
              Token count: <span className="font-bold">{tokenCount}</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
