import React from 'react';

interface EndScreenProps {
  onComplete: () => void;
  isActive: boolean;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onComplete, isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-yellow-100 p-8">
      <h2 className="text-4xl font-bold mb-8">ゲーム完了！</h2>
      <p className="text-2xl mb-12">おめでとうございます！すべてのセクションをクリアしました。</p>
      <button
        onClick={onComplete}
        className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
      >
        もう一度プレイ
      </button>
    </div>
  );
};