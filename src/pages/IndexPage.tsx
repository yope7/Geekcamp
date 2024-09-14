<<<<<<< HEAD
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
=======
import { useCallback, useEffect, useRef } from "react";

import { Game1, Game2, Game3 } from "../components";

export function IndexPage(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);

    const updateScroll = useCallback((event: WheelEvent) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += event.deltaY;
        }
    }, []);

    useEffect(() => {
        // scrollで発火
        window.addEventListener("wheel", updateScroll);

        return () => {
            window.removeEventListener("wheel", updateScroll);
        };
    }, [updateScroll]);

    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
        >
            <div
                ref={containerRef}
                style={{
                    display: "flex",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    width: "100%",
                    height: "100%",
                    // スクロールバーを非表示
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                <div style={{ minWidth: "100vw", backgroundColor: "lightgray" }}>
                    <h1>Index Page</h1>
                </div>
                <div style={{ minWidth: "100vw", height: "100vh" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Game1 />
                    </div>
                </div>
                <div style={{ minWidth: "100vw", height: "100vh" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Game2 />
                    </div>
                </div>
                <div style={{ minWidth: "100vw", height: "100vh" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Game3 />
                    </div>
                </div>
                <div style={{ minWidth: "100vw", backgroundColor: "lightgray" }}>
                    <h1>End Page</h1>
                </div>
            </div>
        </div>
    );
}
>>>>>>> 6ca6860cfffebd8b5aa55a291962f020b626dda6
