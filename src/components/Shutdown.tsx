import React, { useState, useEffect } from 'react';
import { Typewriter } from "react-simple-typewriter";

interface ShutdownProps {
  onShutdownComplete: () => void;
}

export const Shutdown: React.FC<ShutdownProps> = ({ onShutdownComplete }) => {
  const [shutdownState, setShutdownState] = useState<'initial' | 'shutting-down' | 'complete'>('initial');
  const [shutdownStep, setShutdownStep] = useState(0);
  const [typewriterKey, setTypewriterKey] = useState<number>(0);

  const shutdownSequence = [
    'シャットダウンします...',
    'Stopping user processes...',
    '[OK] Stopped User Manager for UID 1000',
    '[OK] Stopped Session 1 of User natsukumo',
    'Stopping system services...',
    '[OK] Stopped Network Manager',
    'Sending SIGTERM to remaining processes...',
    'Sending SIGKILL to remaining processes...',
    'Deactivating swap...',
    'Unmounting final file systems...',
    'Shutting down system...',
    'System halted. It is now safe to turn off your computer.'
  ];

  useEffect(() => {
    if (shutdownState === 'initial') {
      setTimeout(() => setShutdownState('shutting-down'), 500);
    } else if (shutdownState === 'shutting-down') {
      if (shutdownStep < shutdownSequence.length - 1) {
        const timer = setTimeout(() => {
          setShutdownStep(prev => prev + 1);
          setTypewriterKey(prev => prev + 1);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setShutdownState('complete');
      }
    } else if (shutdownState === 'complete') {
      setTimeout(onShutdownComplete, 500);
    }
  }, [shutdownState, shutdownStep, onShutdownComplete]);

  const getCurrentText = () => {
    return [shutdownSequence[shutdownStep]];
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
      position: 'absolute',
      top: 0,
      left: 0,
    //   backgroundColor: 'rgba(0, 0, 0, 0.8)',
    }}>
      {shutdownSequence.slice(0, shutdownStep).map((text, index) => (
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