
import React, { CSSProperties } from 'react';
import { CONTAINER } from '../../Theme/Theme';

interface Props {
    children: any;
    style?: CSSProperties;
}
interface States {

}
export class HomeSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { children, style } = this.props;
        const { } = this.state;
        return (
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                paddingTop: 40, paddingBottom: 40, flexDirection: "column", ...style
            }}>
                {children}
            </div>
        );
    }
} 