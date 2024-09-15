import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Typewriter } from "react-simple-typewriter";

const FISH_COUNT = 5;
const ASPECT_RATIO = 3 / 2; // Width to Height ratio

export const Game2: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [typewriterKey, setTypewriterKey] = useState<number>(0);
  const [gameSize, setGameSize] = useState({ width: 0, height: 0 });
  const [scoopPosition, setScoopPosition] = useState({ x: 0, y: 0 });
  const [fishes, setFishes] = useState<Array<{ x: number; y: number; dx: number; dy: number }>>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const containerRef = useRef<HTMLDivElement>(null);

  const updateGameSize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      let gameWidth, gameHeight;
      if (containerWidth / containerHeight > ASPECT_RATIO) {
        gameHeight = containerHeight * 0.7; // Use 70% of container height
        gameWidth = gameHeight * ASPECT_RATIO;
      } else {
        gameWidth = containerWidth * 0.7; // Use 70% of container width
        gameHeight = gameWidth / ASPECT_RATIO;
      }

      setGameSize({ width: gameWidth, height: gameHeight });
      setScoopPosition({ x: gameWidth / 2, y: gameHeight * 0.8 });
    }
  }, []);

  useEffect(() => {
    updateGameSize();
    window.addEventListener('resize', updateGameSize);
    return () => window.removeEventListener('resize', updateGameSize);
  }, [updateGameSize]);

  const initializeFishes = useCallback(() => {
    return Array.from({ length: FISH_COUNT }, () => ({
      x: Math.random() * gameSize.width,
      y: Math.random() * gameSize.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    }));
  }, [gameSize]);

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
      const moveDistance = gameSize.width * 0.03; // 3% of game width
      switch (e.key) {
        case 'ArrowLeft':
          setScoopPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - moveDistance) }));
          break;
        case 'ArrowRight':
          setScoopPosition((prev) => ({ ...prev, x: Math.min(gameSize.width, prev.x + moveDistance) }));
          break;
        case 'ArrowUp':
          setScoopPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - moveDistance) }));
          break;
        case 'ArrowDown':
          setScoopPosition((prev) => ({ ...prev, y: Math.min(gameSize.height, prev.y + moveDistance) }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, gameSize]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFishes((prevFishes) => {
        return prevFishes.map((fish) => {
          let newX = fish.x + fish.dx;
          let newY = fish.y + fish.dy;

          if (newX <= 0 || newX >= gameSize.width) fish.dx *= -1;
          if (newY <= 0 || newY >= gameSize.height) fish.dy *= -1;

          newX = Math.max(0, Math.min(gameSize.width, newX));
          newY = Math.max(0, Math.min(gameSize.height, newY));

          const scoopSize = gameSize.width * 0.1; // 10% of game width
          const fishSize = gameSize.width * 0.05; // 5% of game width

          if (
            newX < scoopPosition.x + scoopSize &&
            newX + fishSize > scoopPosition.x &&
            newY < scoopPosition.y + scoopSize &&
            newY + fishSize > scoopPosition.y
          ) {
            setScore((prevScore) => prevScore + 1);
            return {
              x: Math.random() * gameSize.width,
              y: Math.random() * gameSize.height,
              dx: (Math.random() - 0.5) * 2,
              dy: (Math.random() - 0.5) * 2
            };
          }

          return { ...fish, x: newX, y: newY };
        });
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, scoopPosition, gameSize]);

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
        return ['金魚すくいへようこそ！'];
      case 'playing':
        return [`残り時間: ${timeLeft}秒 スコア: ${score}`];
      case 'result':
        return [`ゲーム終了！あなたのスコアは ${score} 匹です！`];
      default:
        return [''];
    }
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
            width: gameSize.width,
            height: gameSize.height,
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
                width: `${gameSize.width * 0.05}px`,
                height: `${gameSize.width * 0.05}px`,
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
              width: `${gameSize.width * 0.1}px`,
              height: `${gameSize.width * 0.1}px`,
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
          pointerEvents: 'auto',
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