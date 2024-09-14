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
                    <div
                        style={{
                            width: "400px",
                            height: "300px",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                            perspective: "1000px", // 大きいほうが平面に近づく。多分目からオブジェクトまでの距離
                        }}
                    >
                        <div
                            style={{
                                // 大きさの設定
                                width: "400px",
                                height: "300px",
                                // 子要素の設定
                                display: "flex",
                                flexDirection: "column", // 子要素を縦に並べる
                                // justifyContent: "space-between", // 要素の間にスペースを空ける
                                // 3Dの設定
                                transform: "rotateX(0deg) rotateY(10deg) rotateZ(-5deg)", // x, y, zの回転角度。各軸に対して回転
                                translate: "40px 0px 200px", // 多分x, y, zの移動量
                                transformOrigin: "-30%",
                                // 背景の設定
                                backgroundColor: "black",
                                // テキストの設定
                                fontFamily: "Courier New",
                                color: "#00ffff",
                                // スクロールできるように
                                overflow: "auto",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            <Typewriter words={["Welcome to the Retro World1!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                            <Typewriter words={["Welcome to the Retro World2!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                            <Typewriter words={["Welcome to the Retro World3!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                            <Typewriter words={["Welcome to the Retro World4!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                            <Typewriter words={["Welcome to the Retro World5!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                            <Typewriter words={["Welcome to the Retro World6!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                            <Typewriter words={["Welcome to the Retro World7!"]} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={50} delaySpeed={1000} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
