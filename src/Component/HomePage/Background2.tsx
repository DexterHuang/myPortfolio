import React from 'react';
import { Text } from '../Common/Text';
import { BLUE, LIGHT_BLACK } from '../../Theme/Theme';
import { BackgroundGenerator } from '../../Handler/BackgroundGenerator';

interface Props {

}
interface States {

}
export class Background2 extends React.Component<Props, States> {
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
                {BackgroundGenerator.generateDots(40, 1700, BLUE)}
                <Text style={{
                    position: "absolute", top: window.innerHeight / 2, width: "100%", textAlign: "center",
                    fontSize: "15vw", color: LIGHT_BLACK, fontWeight: 900, lineHeight: "1em"
                }} >
                    "WORLD"
                            </Text>
            </div>
        );
    }
}
