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



const GAME_WIDTH = 300;
const GAME_HEIGHT = 200;
const SCOOP_SIZE = 30;
const FISH_SIZE = 20;
const FISH_COUNT = 5;

interface Fish {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export const Game2: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [typewriterKey, setTypewriterKey] = useState<number>(0);
  const [scoopPosition, setScoopPosition] = useState({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - SCOOP_SIZE });
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const initializeFishes = useCallback(() => {
    return Array.from({ length: FISH_COUNT }, () => ({
      x: Math.random() * (GAME_WIDTH - FISH_SIZE),
      y: Math.random() * (GAME_HEIGHT - FISH_SIZE),
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    }));
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      setFishes(initializeFishes());
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameState('result');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, initializeFishes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      switch (e.key) {
        case 'ArrowLeft':
          setScoopPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 10) }));
          break;
        case 'ArrowRight':
          setScoopPosition((prev) => ({ ...prev, x: Math.min(GAME_WIDTH - SCOOP_SIZE, prev.x + 10) }));
          break;
        case 'ArrowUp':
          setScoopPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - 10) }));
          break;
        case 'ArrowDown':
          setScoopPosition((prev) => ({ ...prev, y: Math.min(GAME_HEIGHT - SCOOP_SIZE, prev.y + 10) }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFishes((prevFishes) => {
        return prevFishes.map((fish) => {
          let newX = fish.x + fish.dx;
          let newY = fish.y + fish.dy;

          if (newX <= 0 || newX >= GAME_WIDTH - FISH_SIZE) fish.dx *= -1;
          if (newY <= 0 || newY >= GAME_HEIGHT - FISH_SIZE) fish.dy *= -1;

          newX = Math.max(0, Math.min(GAME_WIDTH - FISH_SIZE, newX));
          newY = Math.max(0, Math.min(GAME_HEIGHT - FISH_SIZE, newY));

          if (
            newX < scoopPosition.x + SCOOP_SIZE &&
            newX + FISH_SIZE > scoopPosition.x &&
            newY < scoopPosition.y + SCOOP_SIZE &&
            newY + FISH_SIZE > scoopPosition.y
          ) {
            setScore((prevScore) => prevScore + 1);
            return {
              x: Math.random() * (GAME_WIDTH - FISH_SIZE),
              y: Math.random() * (GAME_HEIGHT - FISH_SIZE),
              dx: (Math.random() - 0.5) * 2,
              dy: (Math.random() - 0.5) * 2
            };
          }

          return { ...fish, x: newX, y: newY };
        });
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, scoopPosition]);

  const handleStart = () => {
    if (gameState === 'intro') {
      setGameState('playing');
      setScore(0);
      setTimeLeft(30);
    } else if (gameState === 'result') {
      setGameState('intro');
    }
  };

  const getTypewriterText = () => {
    switch (gameState) {
      case 'intro':
        return ['金魚すくいへようこそ！スタートボタンを押してゲームを始めてください。'];
      case 'playing':
        return [`残り時間: ${timeLeft}秒 スコア: ${score}`];
      case 'result':
        return [`ゲーム終了！あなたのスコアは ${score} 匹です！`];
      default:
        return [''];
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginBottom: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
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
      {gameState === 'playing' && (
        <div
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            border: '2px solid #000',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#87CEEB'
          }}
        >
          {fishes.map((fish, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: fish.x,
                top: fish.y,
                width: FISH_SIZE,
                height: FISH_SIZE,
                backgroundColor: '#FF6347',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: scoopPosition.x,
              top: scoopPosition.y,
              width: SCOOP_SIZE,
              height: SCOOP_SIZE,
              border: '2px solid #000',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }}
          />
        </div>
      )}
      <button
        onClick={handleStart}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        {gameState === 'intro' ? 'スタート' : gameState === 'result' ? 'もう一度遊ぶ' : ''}
      </button>
    </div>
  );
};