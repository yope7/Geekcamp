import { TvScreenLayout } from "../layouts/TvScreenLayout";
import { Game1 } from "../components/Game1";
import { Game2 } from "../components/Game2";
import {Shutdown} from "../components/Shutdown";
import {Boot} from "../components/Boot";
import React, { useState, useEffect } from 'react';

export function IndexPage(): JSX.Element {
    const [currentScreen, setCurrentScreen] = useState('boot');

    const handleBootComplete = () => {
        setCurrentScreen('game1');
    };

    const handleGame1Complete = () => {
        setCurrentScreen('game2');
    };

    const handleGame2Complete = () => {
        // ゲーム2の完了後の処理（必要に応じて）
    };

    const handleShutdown = () => {
        setCurrentScreen('shutdown');
      };
    const handleShutdownComplete = () => {
    // シャットダウン完了後の処理
    // 例: 初期画面（ゲーム1）に戻る
    setCurrentScreen('');
};


    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                whiteSpace: "nowrap",
                pointerEvents: "none",
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
                    zIndex: 2,
                    // pointerEvents: "none",
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
                    // pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        minWidth: "100vw",
                        pointerEvents:"none"
                    }}
                >
                    <TvScreenLayout>
                    <div>
                        {currentScreen === 'boot' && (
                            <Boot onBootComplete={handleBootComplete}/>
                        )}
                        {currentScreen === 'game1' && (
                            <Game1 onGameComplete={handleGame1Complete} />
                        )}
                        {currentScreen === 'game2' && (
                            <Game2 onShutdown={handleShutdown} />
                        )}
                        {currentScreen === 'shutdown' && (
                            <Shutdown onShutdownComplete={handleShutdownComplete} />
                        )}
                    </div>
                    </TvScreenLayout>
                </div>
            </div>
        </div>
    );
}
