import React, { useState, useRef, useEffect } from 'react';
import { TitleComponent } from '../components/TitleComponent';
import Game1 from '../components/Game1';
import { Game2 } from '../components/Game2';
import { EndScreen } from '../components/EndScreen';

interface SectionProps {
  onComplete: () => void;
  isActive: boolean;
}

type SectionComponent = React.ComponentType<SectionProps>;

interface Section {
  component: SectionComponent;
  key: string;
}

export function IndexPage(): JSX.Element {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [sectionComplete, setSectionComplete] = useState<boolean[]>([false, false, false, false]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sections: Section[] = [
    { component: TitleComponent, key: 'title' },
    { component: Game1, key: 'game1' },
    { component: Game2, key: 'game2' },
    { component: EndScreen, key: 'endScreen' }
  ];

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      if (delta > 0 && currentSection < sections.length - 1 && sectionComplete[currentSection]) {
        setCurrentSection(prev => prev + 1);
      } else if (delta < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentSection, sectionComplete, sections.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: currentSection * window.innerWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSection]);

  const handleComplete = (index: number): void => {
    const newSectionComplete = [...sectionComplete];
    newSectionComplete[index] = true;
    setSectionComplete(newSectionComplete);
    if (index < sections.length - 1) {
      setCurrentSection(index + 1);
    }
  };

  const handleSkip = (): void => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <div >
      <Game1 />
    </div>
  );
}