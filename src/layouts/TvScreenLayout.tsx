export function TvScreenLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div
            style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                perspective: "1300px", // 大きいほうが平面に近づく。多分目からオブジェクトまでの距離
                position: "absolute",
                zIndex: 1,
                height: "29%",
                width: "19%",
                top: "58%",
                left: "58%",
                // pointerEvents: "none",
                //スクロールを禁止
                
            }}
        >
            <div
                style={{
                    // この要素の設定
                    width: "100%",
                    height: "100%",
                    padding: "20px",
                    // 子要素の設定
                    display: "flex",
                    flexDirection: "column", // 子要素を縦に並べる
                    // 3Dの設定
                    transform: "rotateX(-5deg) rotateY(21deg) rotateZ(-2.5deg)", // x, y, zの回転角度。各軸に対して回転
                    // translate: "40px 0px 200px", // 多分x, y, zの移動量
                    transformOrigin: "0%",
                    // 背景の設定
                    backgroundColor: "rgb(12, 12, 12)",
                    // backgroundColor: "rgba(0, 0, 0, 0.8)",
                    // テキストの設定
                    fontFamily: "Courier New",
                    color: "#00ffff",
                    // スクロールできるように
                    overflow: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    // 自動改行を有効に
                    whiteSpace: "normal", // テキストを折り返す
                    wordWrap: "break-word", // 長い単語も折り返す
                    // pointerEvents: "none",
                }}
            >
                {children}
            </div>
        </div>
    );
}
