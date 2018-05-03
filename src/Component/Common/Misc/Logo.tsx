
import React from 'react';
import { Text } from '../Text';

interface Props {

}
interface States {

}
export class Logo extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { } = this.props;
        const { } = this.state;
        return (
            <div style={{
                width: "100%", height: "100%",
                display: "flex", justifyContent: "center", alignItems: "center",
            }}>
                <Text style={{
                    color: "white", fontSize: "100%", padding: 8,
                    borderWidth: "medium", borderColor: "white", borderStyle: "solid"
                }}>HD</Text>
            </div>
        );
    }
} 