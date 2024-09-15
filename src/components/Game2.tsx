import React, { useState, useEffect, useCallback } from 'react';
import { Typewriter } from "react-simple-typewriter";

const FISH_COUNT = 7;
const GAME_DURATION = 1; // ゲームの持ち時間を10秒に設定

export const Game2: React.FC<{ onShutdown: () => void }> = ({ onShutdown }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [typewriterKey, setTypewriterKey] = useState<number>(0);
  const [scoopPosition, setScoopPosition] = useState({ x: 7.5, y: 10 });
  const [fishes, setFishes] = useState<Array<{ x: number; y: number; dx: number; dy: number }>>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const handleShutdown = () => {
    onShutdown();
  };
  const initializeFishes = useCallback(() => {
    return Array.from({ length: FISH_COUNT }, () => ({
      x: Math.random() * 15,
      y: Math.random() * 20,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2
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

  const handleStart = () => {
    if (gameState === 'intro') {
      setGameState('playing');
      setScore(0);
      setTimeLeft(GAME_DURATION);
    } else if (gameState === 'result') {
      setGameState('intro');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      const moveDistance = 0.5;
      switch (e.key) {
        case 'ArrowLeft':
          setScoopPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - moveDistance) }));
          break;
        case 'ArrowRight':
          setScoopPosition((prev) => ({ ...prev, x: Math.min(15, prev.x + moveDistance) }));
          break;
        case 'ArrowUp':
          setScoopPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - moveDistance) }));
          break;
        case 'ArrowDown':
          setScoopPosition((prev) => ({ ...prev, y: Math.min(20, prev.y + moveDistance) }));
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

          if (newX <= 0 || newX >= 15) fish.dx *= -1;
          if (newY <= 0 || newY >= 20) fish.dy *= -1;

          newX = Math.max(0, Math.min(15, newX));
          newY = Math.max(0, Math.min(20, newY));

          const scoopSize = 1.5;
          const fishSize = 0.75;

          if (
            newX < scoopPosition.x + scoopSize &&
            newX + fishSize > scoopPosition.x &&
            newY < scoopPosition.y + scoopSize &&
            newY + fishSize > scoopPosition.y
          ) {
            setScore((prevScore) => prevScore + 0.5);
            return {
              x: Math.random() * 15,
              y: Math.random() * 20,
              dx: (Math.random() - 0.5) * 0.2,
              dy: (Math.random() - 0.5) * 0.2
            };
          }

          return { ...fish, x: newX, y: newY };
        });
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, scoopPosition]);


const getTypewriterText = () => {
    switch (gameState) {
      case 'intro':
        return ['金魚すくいへようこそ！\n矢印キーで操作できます'];
      case 'result':
        return [`ゲーム終了！\nあなたのスコアは \n ${score} 匹です！`];
      default:
        return [''];
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'space-between', padding: '0.5vh' }}>
      <div style={{ fontSize: '1vw', textAlign: 'center', marginBottom: '0.5vh',whiteSpace: 'pre-line' }}>
        {gameState === 'playing' ? (
          <div>
            <span>残り時間: {timeLeft}秒</span>
            <span style={{ marginLeft: '1vw' }}><br></br>スコア: {score}匹</span>
          </div>
        ) : (
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
        )}
      </div>
      {gameState === 'playing' && (
        <div
          style={{
            width: '13vw',
            height: '13vh',
            border: '0.2vh solid #00ffff',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#000033'
          }}
        >
          {fishes.map((fish, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${fish.x}vw`,
                top: `${fish.y}vh`,
                width: '0.75vw',
                height: '0.75vh',
                backgroundColor: '#FF6347',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: `${scoopPosition.x}vw`,
              top: `${scoopPosition.y}vh`,
              width: '1vw',
              height: '1vh',
              border: '0.2vh solid #00ffff',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 255, 255, 0.3)'
            }}
          />
        </div>
      )}
       {gameState === 'result' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1vw' }}>
          <button
            onClick={handleStart}
            style={{
              backgroundColor: 'transparent',
              color: '#00ffff',
              border: '0.2vh solid #00ffff',
              padding: '0.5vh 1vw',
              fontSize: '1.3vw',
              cursor: 'pointer',
              borderRadius: '0.5vh',
              pointerEvents: 'auto',
              position: 'absolute',
              marginLeft: '2vw',
              marginTop: '2vw'
            }}
          >
            もう一度遊ぶ
          </button>
          <button
            onClick={handleShutdown}
            style={{
              backgroundColor: 'transparent',
              color: '#ff6347',
              border: '0.2vh solid #ff6347',
              padding: '0.5vh 1vw',
              fontSize: '1.3vw',
              cursor: 'pointer',
              borderRadius: '0.5vh',
              pointerEvents: 'auto',
              position: 'absolute',
              marginTop: '5vw'
            }}
          >
            やめる
          </button>
        </div>
      )}
      {gameState === 'intro' && (
        <button
          onClick={handleStart}
          style={{
            backgroundColor: 'transparent',
            color: '#00ffff',
            border: '0.2vh solid #00ffff',
            padding: '0.5vh 1vw',
            fontSize: '1.3vw',
            cursor: 'pointer',
            borderRadius: '0.5vh',
            marginTop: '14vh',
            pointerEvents: 'auto',
            position: 'absolute',
            marginLeft: '3vw',
          }}
        >
          スタート
        </button>
      )}
    </div>
  );
};