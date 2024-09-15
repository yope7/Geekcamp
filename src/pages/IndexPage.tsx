import { TvScreenLayout } from "../layouts/TvScreenLayout";

export function IndexPage(): JSX.Element {
    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
        >
            <img
                src="/images/ie.png"
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
                    <TvScreenLayout>
                        Game 1
                    </TvScreenLayout>
                </div>
            </div>
        </div>
    );
}
