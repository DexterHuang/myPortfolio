
import React, { ClassAttributes, CSSProperties } from 'react';
import { ResponsiveHandler } from '../../../Handler/ResponsiveHandler';
import { ObjectHelper } from '../../../Handler/ObjectHelper';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    lg?: CSSProperties;
    md?: CSSProperties;
    sm?: CSSProperties;
    xs?: CSSProperties;
}
interface States {
    width: number;
}
export class View extends React.Component<Props, States> {
    static defaultProps = {};
    state = {
        width: window.innerWidth,
    };
    shouldComponentUpdate(nextProps: Props, nextState: States) {
        const s1 = ResponsiveHandler.getStyle(this.props, this.state);
        const s2 = ResponsiveHandler.getStyle(nextProps, nextState);
        return ObjectHelper.equal(s1, s2) === false;
    }
    componentWillMount() {
        window.addEventListener("resize", () => {
            this.setState({ width: window.innerWidth });
        });
    }
    render() {
        const { children } = this.props;
        const { } = this.state;
        return (
            <div {...this.props} style={ResponsiveHandler.getStyle(this.props, this.state)} >
                {children}
            </div>
        );
    }
} 