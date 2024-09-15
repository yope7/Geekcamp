export function TvScreenLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
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
                    // この要素の設定
                    width: "100%",
                    height: "300px",
                    padding: "10px",
                    // 子要素の設定
                    display: "flex",
                    flexDirection: "column", // 子要素を縦に並べる
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
                    // 自動改行を有効に
                    whiteSpace: "normal", // テキストを折り返す
                    wordWrap: "break-word", // 長い単語も折り返す
                }}
            >
                {children}
            </div>
        </div>
    );
}
