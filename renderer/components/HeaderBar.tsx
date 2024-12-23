import React, { CSSProperties } from 'react';

export const TitleBar: React.FC = () => {
  return (
    <div className="border border-b border-solid" style={{
      height: '53px',
      WebkitAppRegion: 'drag',
      paddingLeft: '92px',
    }}>
      {/* ドラッグ可能な領域 */}
      <div 
        className="flex-1 h-full flex items-center"
        style={{ WebkitAppRegion: 'drag' } as CSSProperties}
      >
        <span className="text-md text-gray-400 font-medium">Desktop App</span>
      </div>
      {/* システムのウィンドウコントロール用のスペース */}
      <div className="w-24" />
    </div>
  );
};

export default TitleBar;
