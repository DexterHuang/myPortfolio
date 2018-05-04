import React, { ReactChild, ClassAttributes, CSSProperties } from 'react';
import Typography, { TypographyProps } from 'material-ui/Typography';
import { GREY, WHITE } from '../../Theme/Theme';
import { ResponsiveHandler } from '../../Handler/ResponsiveHandler';
import { ObjectHelper } from '../../Handler/ObjectHelper';

interface Props extends TypographyProps {
    children: ReactChild | ReactChild[];
    lg?: CSSProperties;
    md?: CSSProperties;
    sm?: CSSProperties;
    xs?: CSSProperties;
}
interface States {
    width: number;
}
export class Text extends React.Component<Props, States> {
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
        const props = { ...this.props };
        const style = {
            paddingBottom: 10, fontSize: "1.5em", color: WHITE, ...this.props.style,
            ...ResponsiveHandler.getStyle(this.props, this.state)
        };
        delete props.style;
        return (
            <Typography {...this.props} style={style}  >{children}</Typography>
        );
    }
} 