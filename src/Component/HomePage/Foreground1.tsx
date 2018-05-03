import React from 'react';

import { BackgroundGenerator } from '../../Handler/BackgroundGenerator';
import { LIGHT_BLUE } from '../../Theme/Theme';

interface Props {

}
interface States {

}
export class Foreground1 extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const { } = this.props;
        const { } = this.state;
        return (
            <div>{BackgroundGenerator.generateDots(100, 3000, LIGHT_BLUE)}</div>
        );
    }
}
