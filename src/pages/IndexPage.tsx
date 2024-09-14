import { useCallback, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

import { Game1, Game2, Game3, TV } from "../components";
import { CrtTv } from "../components/CrtTv";

export function IndexPage(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);

    const updateScroll = useCallback((event: WheelEvent) => {
        // width
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
            <img
                src="/images/natukumo.png"
                alt="natsukumo"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1,
                }}
            />
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
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <CrtTv>
                        <Typewriter words={["Welcome to the Retro World!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                    </CrtTv>
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
                        <TV>
                            <Game1 />
                        </TV>
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
                <div
                    style={{
                        minWidth: "100vw",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <h1>End Page</h1>
                </div>
            </div>
        </div>
    );
}
