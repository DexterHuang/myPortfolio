import React from 'react';
import { Styles } from '../Modal/Styles';
import { Text } from '../Common/Text';
import { Grid } from 'material-ui';

interface Props {

}
interface States {

}
export class LandingSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { } = this.props;
        const { } = this.state;
        return (

            <div style={{
                height: window.innerHeight,
                justifyContent: "flex-start", alignItems: "flex-end", display: "flex"
            }}>
                <Grid item md={8} sm={12}>
                    <Text style={{
                        color: "white", fontWeight: "bold", fontSize: "10vw",
                        lineHeight: "1em", padding: "50px", paddingBottom: 150
                    }}>
                        Wellcome!<br />I am<br />Detxer
                </Text>

                </Grid>
            </div>
        );
    }
}

const styles: Styles = {

};