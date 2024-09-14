import React from 'react';

interface TitleComponentProps {
  onComplete: () => void;
  isActive: boolean;
}

export const TitleComponent: React.FC<TitleComponentProps> = ({ onComplete, isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">タイトルコンポーネント</h1>
      <p className="text-xl mb-8">説明：このゲームは横スクロールで進行します。</p>
      <p className="text-lg mb-12">最初のストーリー：冒険の始まりです。準備はいいですか？</p>
      <button
        onClick={onComplete}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        始める
      </button>
    </div>
  );
};