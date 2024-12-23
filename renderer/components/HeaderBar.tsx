import React, { CSSProperties } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';

export const TitleBar: React.FC = () => {
  const router = useRouter();
  const isSettingsPage = router.pathname === '/settings';
  return (
    <div className="flex border border-b w-full border-solid pr-4 h-[51px]" style={{
      WebkitAppRegion: 'drag',
    }}>
      {/* ドラッグ可能な領域 */}
      <div 
        className="flex-1 flex items-center justify-end h-[51px]"
        style={{ WebkitAppRegion: 'drag' } as CSSProperties}
      >

      <div className="flex items-center justify-center gap-2" style={{ WebkitAppRegion: 'no-drag' }}>
        {isSettingsPage ? (
          <Link href="/" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100">
            <HomeIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Home</span>
          </Link>
        ): (<Link href="/settings" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100">
          <Cog6ToothIcon className={`w-4 h-4 text-gray-500`} />
          <span className={`text-sm text-gray-500`}>Settings</span>
        </Link>)}
        
      </div>
      </div>
    </div>
  );
};

export default TitleBar;
