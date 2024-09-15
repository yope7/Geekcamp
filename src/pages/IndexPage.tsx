import { TvScreenLayout } from "../layouts/TvScreenLayout";
import { Game1 } from "../components/Game1";
import { Game2 } from "../components/Game2";
import React, { useState, useEffect } from 'react';

export function IndexPage(): JSX.Element {
      const [currentGame, setCurrentGame] = useState<'game1' | 'game2'>('game1');

      const handleGame1Complete = () => {
        setCurrentGame('game2');
      };


    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
        >
            <img
                src="/images/home.png"
                alt="natsukumo"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    // objectFit: "cover",
                    zIndex: -1,
                }}
            />
            <div
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
                <div
                    style={{
                        minWidth: "100vw",
                    }}
                >
                    <TvScreenLayout>
                    <div>
                    {currentGame === 'game1' ? (
                        <Game1 onGameComplete={handleGame1Complete} />
                    ) : (
                        <Game2 />
                    )}
                    </div>
                    </TvScreenLayout>
                </div>
            </div>
        </div>
    );
}
