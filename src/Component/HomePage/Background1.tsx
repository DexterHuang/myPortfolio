import React, { CSSProperties } from 'react';
import { Text } from '../Common/Text';
import { LIGHT_BLACK, BLUE, LIGHT_BLUE } from '../../Theme/Theme';
import { BackgroundGenerator } from '../../Handler/BackgroundGenerator';

interface Props {

}
interface States {

}
export class Background1 extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const { } = this.props;
        const { } = this.state;
        return (
            <div >
                <Text style={{
                    position: "absolute", top: 50,
                    fontSize: "15vw", color: LIGHT_BLACK, fontWeight: 900
                }} >
                    {"<HELLO/>"}
                </Text>
                <Text style={{
                    position: "absolute", top: window.innerHeight - 200, right: 0,
                    fontSize: "15vw", color: LIGHT_BLACK, fontWeight: 900
                }} >
                    {"</HELLO>"}
                </Text>
                {BackgroundGenerator.generateDots(70, 2000, BLUE)}
            </div>
        );
    }
} 