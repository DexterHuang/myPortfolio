import React from 'react';

import { VoxelHandler } from '../../Handler/Voxel/VoxelHandler';
import { Styles } from '../Modal/Styles';

interface Props {

}
interface States {

}
export class VoxelPage extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    canvas: HTMLCanvasElement;
    componentDidMount() {
        VoxelHandler.setUp(this.canvas);
    }
    render() {
        const { } = this.props;
        const { } = this.state;
        return (
            <div>
                <canvas ref={ref => this.canvas = ref as any} />
                <div id="info" style={styles.info}>empty
                </div>
            </div>

        );
    }
}

const styles: Styles = {
    info: {
        position: "absolute",
        top: 0,
        left: 0,
        color: "white"
    }
};