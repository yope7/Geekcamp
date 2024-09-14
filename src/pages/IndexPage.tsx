import { useCallback, useEffect, useRef } from "react";

import { Game1, Game2, Game3 } from "../components";

export function IndexPage(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);

    const updateScroll = useCallback(() => {
        if (containerRef.current) {
            // スクロール位置に応じて横に移動
            console.log(window.scrollY);
            containerRef.current.scrollLeft = window.scrollY;
        }
    }, []);

    useEffect(() => {
        // scrollで発火
        window.addEventListener("scroll", updateScroll);

        return () => {
            window.removeEventListener("scroll", updateScroll);
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
                <div style={{ minWidth: "100vw" }}>
                    <h1>Index Page</h1>
                </div>
                <div style={{ minWidth: "100vw" }}>
                    <Game1 />
                </div>
                <div style={{ minWidth: "100vw" }}>
                    <Game2 />
                </div>
                <div style={{ minWidth: "100vw" }}>
                    <Game3 />
                </div>
                <div style={{ minWidth: "100vw" }}>
                    <h1>End Page</h1>
                </div>
            </div>
        </div>
    );
}
