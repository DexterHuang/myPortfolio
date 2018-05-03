
import React from "react";
import { CSSProperties } from "react";
import { BLUE, BLACK } from "../Theme/Theme";

export class BackgroundGenerator {
    static generateDots(size: number, height: number, color: any) {
        let currentHeight = 100;
        const dots: any[] = [];
        while (currentHeight < height) {
            const right = Math.random() > 0.5;
            let style: any = {
                position: "absolute",
                height: size, width: size, borderRadius: size / 3, backgroundColor: color,
                top: currentHeight + "px", display: "flex", justifyContent: "center", alignItems: "center"
            };
            if (right) {
                style = { ...style, right: Math.floor(Math.random() * 300) + 50 };
            } else {
                style = { ...style, left: Math.floor(Math.random() * 300) + 50 };
            }
            dots.push(<div style={style as any} key={currentHeight} >
                <div style={{ height: size / 3, width: size / 3, backgroundColor: BLACK, borderRadius: 5 }} />
            </div>);
            currentHeight += (Math.random() * 500) + 600;
        }
        return dots;
    }
}