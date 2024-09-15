import React from "react";

export function CrtTv({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 10%",
                position: "relative",
                rotate: "20% 50%",
            }}
        >
            {/* <img 
                src="/images/TV.png" 
                alt="Vintage TV" 
                width="800px" 
                style={{ position: "relative" }} 
            /> */}
            <div
                style={{
                    position: "absolute",
                    top: "80px",
                    left: "670px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: "570px",
                        height: "430px",
                        padding: "20px",
                        backgroundColor: "black",
                        border: "10px solid #333",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)",
                        position: "relative",
                        // zIndex: ,
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black",
                            position: "relative",
                            overflowX: "auto", // Allow horizontal scroll
                            whiteSpace: "nowrap",
                            borderRadius: "10px",
                            boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.8)",
                            color: "#ffffff",
                            fontFamily: '"Courier New", Courier, monospace',
                            display: "flex",
                            padding: "10px",
                            filter: "contrast(1.2) brightness(1.1)",
                            animation: "crt-flicker 0.15s infinite",
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
