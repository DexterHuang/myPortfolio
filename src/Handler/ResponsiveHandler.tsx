import { CSSProperties } from "react";

export class ResponsiveHandler {

    static getStyle(props, state): CSSProperties {
        const { xs, sm, md, lg, style } = props;
        const { width } = state;
        if (width < 544 && xs) {
            return { ...style, ...xs };
        }
        if (width < 991 && sm) {
            return { ...style, ...sm };
        }
        if (width < 1199 && md) {
            return { ...style, ...md };
        }
        return { ...style, ...lg };
    }
}