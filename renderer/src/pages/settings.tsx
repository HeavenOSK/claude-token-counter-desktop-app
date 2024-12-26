import { useEffect, useState } from "react";
import { keychainUtils } from "../utils/keychain";

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(false);

  const maskApiKey = (key: string) => {
    const visibleLength = Math.ceil(3); // Show 20%
    const visiblePart = key.slice(0, visibleLength); // Show first 20%
    const maskedPart = "*".repeat(key.length - visibleLength); // Fill the rest with asterisks
    return visiblePart + maskedPart;
  };

  useEffect(() => {
    const checkStoredKey = async () => {
      try {
        const savedApiKey = await keychainUtils.getApiKey();
        setHasStoredKey(!!savedApiKey);
      } catch (error) {
        console.error("Failed to verify API Key:", error);
      }
    };
    checkStoredKey();
  }, []);

  const handleSave = async () => {
    try {
      await keychainUtils.saveApiKey(apiKey);
      setMessage("API Key has been saved");
      setApiKey("");
      setHasStoredKey(true);
    } catch (error) {
      setMessage("Failed to save API Key");
      console.error(error);
    }
  };

  const handleTest = async () => {
    try {
      const savedApiKey = await keychainUtils.getApiKey();
      if (savedApiKey) {
        alert(`Stored API Key:\n ${maskApiKey(savedApiKey).slice(0, 26)}`);
      } else {
        alert("No API Key stored");
      }
    } catch (error) {
      alert("Failed to retrieve API Key");
      console.error(error);
    }
  };

  return (
    <main className="p-8 flex flex-col items-center h-full">
      <div className="w-full max-w-2xl pr-[240px]">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="apiKey" className="font-bold text-gray-700">
              API Key
            </label>
            {!hasStoredKey && (
              <span className="text-sm text-red-500">
                (Required for token counting)
              </span>
            )}
          </div>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API Key"
            className="w-full p-4 border rounded-lg mb-4 font-mono"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={hasStoredKey && !apiKey}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {hasStoredKey && !apiKey ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleTest}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!hasStoredKey}
          >
            Show Key
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                await keychainUtils.deleteApiKey();
                setHasStoredKey(false);
                setMessage("API Key has been cleared");
              } catch (error) {
                setMessage("Failed to clear API Key");
                console.error(error);
              }
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!hasStoredKey}
          >
            Clear Key
          </button>
        </div>

        {message && (
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 overflow-hidden text-sm">
            <div className="overflow-hidden">{message}</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SettingsPage;
