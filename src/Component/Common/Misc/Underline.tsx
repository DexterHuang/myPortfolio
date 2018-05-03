
import React, { CSSProperties } from 'react';
import { GREY, WHITE } from '../../../Theme/Theme';

interface Props {
    children: any;
    style?: CSSProperties;
}
interface States {

}
export class Underline extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { children, style } = this.props;
        const { } = this.state;
        return (
            <div style={{
                flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center",
                paddingBottom: "40px", ...style
            }}>
                {children}
                <div style={{
                    borderTopWidth: "thick", borderTopStyle: "solid", borderColor: WHITE,
                    width: "80%", alignSelf: "center"
                }} />
            </div>
        );
    }
}
