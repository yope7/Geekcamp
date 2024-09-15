import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'space-between', padding: '5px' }}>
      <div style={{ fontSize: '0.8em', textAlign: 'center', marginBottom: '5px' }}>
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
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #00ffff',
        borderRadius: '5px',
        padding: '5px',
        overflow: 'hidden'
      }}>
        <div style={{ fontSize: '0.7em', textAlign: 'center', marginBottom: '5px' }}>
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
          <pre style={{ 
            textAlign: 'center', 
            color: '#00ffff', 
            fontSize: '0.6em',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            maxWidth: '100%',
            maxHeight: '60%',
            overflow: 'hidden',
            margin: '5px 0'
          }}>
            {maskArt}
          </pre>
        )}
        <button
          onClick={handleStart}
          style={{
            pointerEvents:"auto",
            backgroundColor: 'transparent',
            color: '#00ffff',
            border: '1px solid #00ffff',
            padding: '5px 10px',
            fontSize: '0.7em',
            cursor: 'pointer',
            borderRadius: '3px',
            marginTop: '5px'
          }}
        >
          {gameState === 'intro' ? 'Start' : gameState === 'playing' ? 'お面を引く' : 'Game2へ進む'}
        </button>
      </div>
    </div>
  );
};