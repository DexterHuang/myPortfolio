import React, { ReactChild, CSSProperties } from 'react';
import { BLACK } from '../../../Theme/Theme';
import { NavigationHelper } from '../../../Handler/NavigationHelper';
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
    lastTime: any;
    componentDidMount() {
        let last: any = null;
        let lastTime: any = null;
        const animate = () => {
            requestAnimationFrame(animate);
            if (NavigationHelper.isMobile() === false) {
                if (window.scrollY !== last) {
                    if (!lastTime) {
                        lastTime = Date.now();
                    }
                    this.updateOffset();
                    last = window.scrollY;
                    lastTime = Date.now();
                }
            }
        };
        animate();
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
        if (window.innerWidth > 800) {
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
        } else {
            this.setState({
                foreground1Offset: 0,
                offset1: 0,
                offset2: 0
            });
        }

    }
    render() {
        const { children, background1, background2, foreground1, noHeight } = this.props;
        const { offset1, offset2, foreground1Offset } = this.state;
        const left = 0;
        const heightWidth = noHeight ? {} : { width: "100%", height: "100%" };
        const transition: CSSProperties = { transition: `transform ${Date.now() - this.lastTime}ms`, transitionTimingFunction: "ease-out" };
        return (
            <div style={{ position: "relative", ...heightWidth, pointerEvents: "none" }} ref={ref => this.content = ref as any}>
                <div style={{
                    position: "absolute", ...heightWidth, transform: `translateY(${offset2}px)`, left,
                    zIndex: 2, pointerEvents: "none", ...transition
                }} ref={ref => this.background2 = ref as any}>
                    {background2}
                </div>
                <div style={{
                    position: "absolute", ...heightWidth, transform: `translateY(${offset1}px)`, left: 0,
                    zIndex: 3, pointerEvents: "none", ...transition
                }} ref={ref => this.background1 = ref as any}>
                    {background1}
                </div>

                <div style={{
                    position: "absolute", ...heightWidth, transform: `translateY(${foreground1Offset}px)`, left,
                    zIndex: 5, pointerEvents: "none", ...transition
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