import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Fireworks } from '@fireworks-js/react';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';

const masks = [
  { id: 1, name: "狐面", rarity: "common", score: 10, color: "text-orange-400", emoji: "🦊" },
  { id: 2, name: "般若面", rarity: "uncommon", score: 30, color: "text-red-500", emoji: "👺" },
  { id: 3, name: "天狗面", rarity: "rare", score: 50, color: "text-purple-600", emoji: "🐶" },
  { id: 4, name: "鬼面", rarity: "superRare", score: 100, color: "text-yellow-400", emoji: "👹" },
  { id: 5, name: "お多福面", rarity: "common", score: 10, color: "text-pink-300", emoji: "😊" },
];

const rarityColors = {
  common: "bg-gradient-to-br from-gray-200 to-gray-300",
  uncommon: "bg-gradient-to-br from-green-200 to-green-300",
  rare: "bg-gradient-to-br from-blue-200 to-blue-300",
  superRare: "bg-gradient-to-br from-yellow-200 to-yellow-300",
};

const bgmUrl = "https://example.com/festival-bgm.mp3"; // お祭りBGMのURL（実際のURLに置き換えてください）

export function Game1() {
  const [currentMask, setCurrentMask] = useState(null);
  const [score, setScore] = useState(0);
  const [pulls, setPulls] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [audio] = useState(new Audio(bgmUrl));
  const fireworksRef = useRef(null);

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const spinGacha = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomMask = masks[Math.floor(Math.random() * masks.length)];
      setCurrentMask(randomMask);
      setScore(prevScore => prevScore + randomMask.score);
      setPulls(prevPulls => prevPulls + 1);
      setIsSpinning(false);

      if (randomMask.rarity === "rare" || randomMask.rarity === "superRare") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        fireworksRef.current?.start();
        setTimeout(() => fireworksRef.current?.stop(), 5000);
      }
    }, 2000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-red-50'} transition-colors duration-300 overflow-hidden`}>
      {/* <Fireworks
        ref={fireworksRef}
        options={{
          opacity: 0.5,
          autoresize: true,
          intensity: 20,
          explosion: 5,
          rocketsPoint: {
            min: 0,
            max: 100
          }
        }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      /> */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="absolute top-4 right-4 flex space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
            {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
          <button onClick={toggleMute} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
            {isMuted ? <VolumeX className="w-6 h-6 text-red-500" /> : <Volume2 className="w-6 h-6 text-green-500" />}
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-2xl rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-opacity-10 bg-red-100 z-0"></div>
            <div className="relative z-10">
              <header className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-2 text-red-600 font-japanese">お面ガチャ</h1>
                <p className="text-xl text-gray-600 font-japanese">縁日の思い出を引き当てよう！</p>
              </header>

              <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-6 mb-8 shadow-inner">
                <div className="text-center mb-4">
                  <p className="text-2xl font-semibold text-red-700">スコア: {score}</p>
                  <p className="text-lg text-gray-600">ガチャ回数: {pulls}</p>
                </div>

                <div className="flex justify-center mb-6">
                  <motion.button
                    className={`px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-xl shadow-lg ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-600 hover:to-red-700'}`}
                    onClick={spinGacha}
                    disabled={isSpinning}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSpinning ? '選び中...' : 'ガチャを引く'}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {currentMask && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`text-center p-6 rounded-2xl shadow-md ${rarityColors[currentMask.rarity]}`}
                    >
                      <h2 className={`text-3xl font-bold mb-2 ${currentMask.color}`}>
                        {currentMask.emoji} {currentMask.name}
                      </h2>
                      <p className="text-xl mb-1">レア度: {currentMask.rarity}</p>
                      <p className="text-xl">スコア: +{currentMask.score}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}