import React, { CSSProperties } from 'react';
import { Tooltip } from 'material-ui';

interface Props {
    src: any;
    title: string;
    style?: CSSProperties;
    url: string;
}
interface States {

}
export class SkillButton extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { src, title, style, url } = this.props;
        const { } = this.state;
        return (
            <div style={{ marginRight: "30px", marginLeft: "30px" }}
                onClick={() => {
                    console.log("eqwe");
                    window.open(url, '_black');
                }}>
                <Tooltip title={title} placement="top">
                    <img style={{ height: 120, ...style }} src={src} />
                </Tooltip>

            </div>
        );
    }
} 