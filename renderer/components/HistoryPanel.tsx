import { TokenCountHistory } from '../interfaces/history';
import { HistoryItem } from './HistoryItem';

type Props = {
  history: TokenCountHistory[];
  onClear: () => void;
};

export const HistoryPanel = ({ history, onClear }: Props) => {
  const handleClearClick = () => {
    if (window.confirm('Are you sure you want to clear the history?')) {
      onClear();
    }
  };

  return (
    <div className="w-[240px] bg-white border-l border-gray-200 overflow-y-auto z-10">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h2 className="font-bold text-sm">History</h2>
        {history.length > 0 && (
          <button
            onClick={handleClearClick}
            className="text-xs text-blue-500 hover:bg-blue-50 px-2 py-1 rounded"
          >
            clear
          </button>
        )}
      </div>
      
      <div className="divide-y divide-gray-200">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
      
      {history.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-sm">
          No history yet
        </div>
      )}
    </div>
  );
};
