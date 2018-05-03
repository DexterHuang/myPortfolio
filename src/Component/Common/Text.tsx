import React, { ReactChild } from 'react';
import Typography, { TypographyProps } from 'material-ui/Typography';
import { GREY, WHITE } from '../../Theme/Theme';

interface Props extends TypographyProps {
    children: ReactChild | ReactChild[];
}
interface States {

}
export class Text extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { children } = this.props;
        const { } = this.state;
        const props = { ...this.props };
        const style = { paddingBottom: 10, fontSize: "1.5em", color: WHITE, ...this.props.style };
        delete props.style;
        return (
            <Typography {...this.props} style={style}  >{children}</Typography>
        );
    }
} 