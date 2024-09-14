import React, { useState } from 'react';

interface Game2Props {
  // onComplete: () => void;
  // isActive: boolean;__
}

export const Game2: React.FC<Game2Props> = () => {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === 'react') {
      setMessage('正解！');
    } else {
      setMessage('不正解。もう一度試してみてください。');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-purple-100 p-8">
      <h2 className="text-3xl font-bold mb-8">ゲーム2：クイズ</h2>
      <p className="text-xl mb-8">質問：このアプリケーションの開発に使用されているJavaScriptライブラリは何ですか？</p>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="px-4 py-2 border rounded-lg mr-4"
          placeholder="回答を入力"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
        >
          回答する
        </button>
      </form>
      {message && <p className="text-xl mb-8">{message}</p>}
      <button
        // onClick={onComplete}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        ゲーム2を完了
      </button>
    </div>
  );
};