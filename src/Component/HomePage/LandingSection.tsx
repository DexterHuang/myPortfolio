import React from 'react';
import { Styles } from '../Modal/Styles';
import { Text } from '../Common/Text';
import { Grid } from 'material-ui';

interface Props {

}
interface States {
    height: number;
}
export class LandingSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {
        height: window.innerHeight,
    };
    componentWillMount() {
        window.addEventListener("resize", () => {
            this.setState({ height: window.innerHeight });
        });
    }
    render() {
        const { } = this.props;
        const { height } = this.state;
        return (
            <div style={{
                height: height,
                justifyContent: "flex-start", alignItems: "center", display: "flex"
            }}>
                <Grid item md={8} sm={12}>
                    <Text style={{
                        color: "white", fontWeight: "bold", fontSize: "10vw",
                        lineHeight: "1em", padding: "50px", paddingBottom: 150
                    }} sm={{ fontSize: "15vw" }}>
                        Wellcome!<br />I am<br />Detxer
                </Text>

                </Grid>
            </div>
        );
    }
}

const styles: Styles = {

};