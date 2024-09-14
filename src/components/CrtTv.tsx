import React from "react";
import "../styles/CrtTv.css";

export function CrtTv({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 10%",
        }}>
            <div className="crt-tv">
                <div className="crt-screen">{children}</div>
            </div>
        </div>
    );
}
