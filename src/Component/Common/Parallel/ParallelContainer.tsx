import React, { ReactChild } from 'react';
import { BLACK } from '../../../Theme/Theme';
interface Props {
    children?: ReactChild | ReactChild[];
    background1?: JSX.Element | JSX.Element[];
    background2?: JSX.Element | JSX.Element[];
    foreground1?: JSX.Element | JSX.Element[];
    noHeight?: boolean;
}
interface States {
    offset1: number;
    offset2: number;
    foreground1Offset: number;
}
export class ParallelContainer extends React.Component<Props, States> {
    static defaultProps = {};
    background1: HTMLDivElement;
    background2: HTMLDivElement;
    foreground1: HTMLDivElement;
    content: HTMLDivElement;
    state = {
        offset1: 0,
        offset2: 0,
        foreground1Offset: 0
    };
    componentDidMount() {
        this.updateOffset();
        window.addEventListener("scroll", (e: Event) => {
            this.updateOffset();
        });
    }
    updateOffset() {
        const { noHeight } = this.props;
        if (!this.props.background1 && !this.props.background2 && !this.props.foreground1) {
            return;
        }

        const backgroundHeight1 = this.background1.getClientRects()[0].height;
        const backgroundHeight2 = this.background2.getClientRects()[0].height;
        const foregroundHeight1 = this.foreground1.getClientRects()[0].height;
        const contentHeight = this.content.getClientRects()[0].height;
        const loc = this.content.getClientRects()[0].top + window.scrollY;
        const halfWindowHeight = (window.innerHeight / 2);
        if (noHeight) {
            this.setState({
                foreground1Offset: + ((loc - window.scrollY) / 2),
                offset1: - ((loc - window.scrollY) / 3),
                offset2: - ((loc - window.scrollY) / 2)
            });
        } else {
            this.setState({
                foreground1Offset: -(foregroundHeight1 / 2) + (contentHeight / 2)
                    + ((loc - window.scrollY - halfWindowHeight) / 2),
                offset1: -(backgroundHeight1 / 2) + (contentHeight / 2)
                    - ((loc - window.scrollY - halfWindowHeight) / 3),
                offset2: -(backgroundHeight2 / 2) + (contentHeight / 2)
                    - ((loc - window.scrollY - halfWindowHeight) / 3)
            });
        }
    }
    render() {
        const { children, background1, background2, foreground1, noHeight } = this.props;
        const { offset1, offset2, foreground1Offset } = this.state;
        const left = 0;
        const heightWidth = noHeight ? {} : { width: "100%", height: "100%" };
        return (
            <div style={{ position: "relative", ...heightWidth, pointerEvents: "none" }} ref={ref => this.content = ref as any}>
                <div style={{
                    position: "absolute", ...heightWidth, top: offset2, left,
                    zIndex: 2, pointerEvents: "none"
                }} ref={ref => this.background2 = ref as any}>
                    {background2}
                </div>
                <div style={{
                    position: "absolute", ...heightWidth, top: offset1, left: 0,
                    zIndex: 3, pointerEvents: "none"
                }} ref={ref => this.background1 = ref as any}>
                    {background1}
                </div>

                <div style={{
                    position: "absolute", ...heightWidth, top: foreground1Offset, left,
                    zIndex: 5, pointerEvents: "none"
                }} ref={ref => this.foreground1 = ref as any}>
                    {foreground1}
                </div>
                <div style={{ position: "relative", zIndex: 4, ...heightWidth, pointerEvents: "all" }}>
                    {children}
                </div>
            </div>
        );
    }
} 