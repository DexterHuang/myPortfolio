import React from 'react';
import { Styles } from '../Modal/Styles';
import { VoxelHandler } from '../../Handler/VoxelHandler';
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
            <canvas ref={ref => this.canvas = ref as any} />
        );
    }
}

const styles: Styles = {

};