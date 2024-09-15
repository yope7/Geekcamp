import React, { useState, useEffect } from 'react';
import { Typewriter } from "react-simple-typewriter";

export const Boot: React.FC<{ onBootComplete: () => void }> = ({ onBootComplete }) => {
  const [bootState, setBootState] = useState<'initial' | 'booting' | 'complete'>('initial');
  const [bootStep, setBootStep] = useState(0);
  const [typewriterKey, setTypewriterKey] = useState<number>(0);

  const bootSequence = [
    '起動中...',
    'BIOS POST completed',
    'Loading bootloader...',
    'GRUB 2.04 detected',
    'Loading Linux kernel 5.15.0-generic...',
    '[OK] Reached target Local File Systems',
    '[OK] Started Network Manager',
    'Starting user session...',
    'Welcome to RetoroOS 1.0!',
  ];

  useEffect(() => {
    if (bootState === 'initial') {
      setTimeout(() => setBootState('booting'), 1000);
    } else if (bootState === 'booting') {
      if (bootStep < bootSequence.length - 1) {
        const timer = setTimeout(() => {
          setBootStep(prev => prev + 1);
          setTypewriterKey(prev => prev + 1);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setBootState('complete');
      }
    } else if (bootState === 'complete') {
      setTimeout(onBootComplete, 1000);
    }
  }, [bootState, bootStep, onBootComplete]);

  const getCurrentText = () => {
    return [bootSequence[bootStep]];
  };

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      color: '#00ffff', 
      fontFamily: 'monospace',
      padding: '2vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      overflowY: 'auto',
      fontSize: '0.8vw',
    }}>
      {bootSequence.slice(0, bootStep).map((text, index) => (
        <div key={index} style={{ fontSize: '1vw', marginBottom: '0.5vh' }}>
          {text}
        </div>
      ))}
      <div style={{ 
        fontSize: '1vw', 
        textAlign: 'left', 
        whiteSpace: 'pre-line',
        maxWidth: '100%',
      }}>
        <Typewriter
          key={typewriterKey}
          words={getCurrentText()}
          loop={1}
          cursor
          cursorStyle="_"
          typeSpeed={60}
          deleteSpeed={10}
          delaySpeed={1000}
        />
      </div>
    </div>
  );
};