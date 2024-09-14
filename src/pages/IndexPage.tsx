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
                <div
                    style={{
                        minWidth: "100vw",                        
                        background: "linear-gradient(to right, gray, white)",
                    }}
                >
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
