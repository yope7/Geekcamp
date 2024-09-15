import React, { useState, useEffect } from 'react';
import { Typewriter } from "react-simple-typewriter";

const maskAsciiArt = {
  狐: `
   /\\_/\\
  ( o.o )
   > ^ <
  `,
  天狗: `
    _/\\_
   (o  o)
    \\__/
  `,
  般若: `
   _____
  /     \\
 | o   o |
  \\_____/
  `,
  おかめ: `
   _____
  /     \\
 ( ^   ^ )
  \\_____/
  `,
  ひょっとこ: `
   _____
  /     \\
 ( o   O )
  \\_---_/
  `
};

export const Game1 = () => {
  const [gameState, setGameState] = useState('intro');
  const [result, setResult] = useState('');
  const [maskArt, setMaskArt] = useState('');
  const [typewriterKey, setTypewriterKey] = useState(0);

  const masks = ['狐', '天狗', '般若', 'おかめ', 'ひょっとこ'];

  useEffect(() => {
    setTypewriterKey(prevKey => prevKey + 1);
  }, [gameState, result]);

  const handleStart = () => {
    if (gameState === 'intro') {
      setGameState('playing');
    } else if (gameState === 'playing') {
      const randomMask = masks[Math.floor(Math.random() * masks.length)];
      setResult(`あなたが引いたお面は... ${randomMask}です！`);
      setMaskArt(maskAsciiArt[randomMask]);
      setGameState('result');
    } else {
      setGameState('intro');
      setResult('');
      setMaskArt('');
    }
  };

  const getTypewriterText = () => {
    switch (gameState) {
      case 'intro':
        return ['スタートボタンを押してゲームを始めてください。'];
      case 'playing':
        return ['お面を引く準備ができました。', 'もう一度ボタンを押してお面を引いてください。'];
      case 'result':
        return [result, 'もう一度遊ぶ場合はボタンを押してください。'];
      default:
        return [''];
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'space-between' }}>
      <div style={{ width: '100%', textAlign: 'center', padding: '10px 0', color: 'white' }}>
        <Typewriter
        key={typewriterKey} 
          words="お面くじびき"
          loop={1}
          cursor
          cursorStyle="_"
          typeSpeed={50}
          deleteSpeed={10}
          delaySpeed={1000}
        />
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '20px', fontSize: '1.2rem', textAlign: 'center', minHeight: '3em' }}>
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
      <button
        onClick={handleStart}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '15px 0',
          fontSize: '1.5rem',
          cursor: 'pointer',
          width: '100%',
          marginTop: 'auto'
        }}
      >
        {gameState === 'intro' ? 'Start' : gameState === 'playing' ? 'お面を引く' : 'もう一度遊ぶ'}
      </button>
    </div>
  );
};