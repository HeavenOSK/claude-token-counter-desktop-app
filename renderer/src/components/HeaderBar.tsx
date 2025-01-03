import { Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type React from 'react';
import { type CSSProperties, useEffect, useState } from 'react';
import { keychainUtils } from '../utils/keychain';

export const TitleBar: React.FC = () => {
  const router = useRouter();
  const isSettingsPage = router.pathname === '/settings';
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: router.pathname dependency needs to update
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
  }, [router.pathname]); // パス変更時に再実行されるように依存配列にrouter.pathnameを追加

  return (
    <div
      className="flex border border-b w-full border-solid pr-4 h-[51px]"
      style={{
        WebkitAppRegion: 'drag',
      }}
    >
      {/* ドラッグ可能な領域 */}
      <div
        className="flex-1 flex items-center justify-end h-[51px]"
        style={{ WebkitAppRegion: 'drag' } as CSSProperties}
      >
        <div
          className="flex items-center justify-center gap-2"
          style={{ WebkitAppRegion: 'no-drag' }}
        >
          {isSettingsPage ? (
            <Link
              href="/"
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
            >
              <HomeIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Home</span>
            </Link>
          ) : (
            <div className="relative">
              {!hasApiKey && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
              <Link
                href="/settings"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
              >
                <Cog6ToothIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Settings</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
