import React, { useState, useEffect,useCallback } from 'react';
import { Typewriter } from "react-simple-typewriter";

const maskAsciiArt = {
  狐: `
   /\\_/\\
  ( o.o )
   > ^ <
  `,
  うさぎ: `
(⌒ヽ /⌒)
　 ＼ Ｖ ／
　 ／･ω･＼
　｜ ❤ 　｜
　 ＼＿＿／
  `,
  いぬ: `
┏┳━━━━━┳┓
┃┃・ ▼ ・┃┃
┃┃〃┗┻┛〃┃┃
┗┫┏┓　┏┓┣┛
  `,
  かわいいねこ: `
╱|、
 (˚ˎ 。7
  |、˜〵
   じしˍ,)ノ
  `,
  某キャラクター: `
/＼＿_.ヘ／ヽ
　　 /　　　(＿(⌒厂ヽ
　　|　　　　　￣＼ノ
∩∩ ミ⁰̷̴͈ 　。　⁰̷̴͈ 　　ミ
( ⊂) 乀＿＿＿＿＿ノ
  `
};

interface Game1Props {
  onGameComplete: () => void;
}

export const Game1: React.FC<Game1Props> = ({ onGameComplete }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [result, setResult] = useState<string>('');
  const [maskArt, setMaskArt] = useState<string>('');
  const [typewriterKey, setTypewriterKey] = useState<number>(0);

  const masks = ['狐', 'うさぎ', 'いぬ', 'かわいいねこ', '某キャラクター'];

  useEffect(() => {
    setTypewriterKey(prevKey => prevKey + 1);
  }, [gameState, result]);

  const handleStart = () => {
    if (gameState === 'intro') {
      setGameState('playing');
    } else if (gameState === 'playing') {
      const randomMask = masks[Math.floor(Math.random() * masks.length)];
      setResult(`あなたが引いたお面は... ${randomMask}です！`);
      setMaskArt(maskAsciiArt[randomMask as keyof typeof maskAsciiArt]);
      setGameState('result');
    } else {
      onGameComplete();
    }
  };

  const getTypewriterText = () => {
    switch (gameState) {
      case 'intro':
        return ['スタートボタンを押してゲームを始めてください。'];
      case 'playing':
        return ['ボタンを押してお面を引いてください。'];
      case 'result':
        return [result, 'ボタンを押してGame2に進んでください。'];
      default:
        return [''];
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '40vh', width: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ width: '100%', textAlign: 'center', padding: '10px 0', color: 'white' }}>
          <Typewriter
            key={typewriterKey} 
            words={['お面くじびき']}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={10}
            delaySpeed={1000}
          />
        </div>
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '10px', fontSize: '0.8rem', textAlign: 'center' }}>
            <Typewriter
              key={typewriterKey}
              words={getTypewriterText()}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={10}
              delaySpeed={1000}
            />
          </div>
          {maskArt && (
            <pre style={{ textAlign: 'center', color: '#ffffff', fontSize: '0.8rem' }}>
              {maskArt}
            </pre>
          )}
        </div>
      </div>
      <button
        onClick={handleStart}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '15px 0',
          fontSize: '1.5rem',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        {gameState === 'intro' ? 'Start' : gameState === 'playing' ? 'お面を引く' : 'Game2へ進む'}
      </button>
    </div>
  );
};
