
import React from 'react';
import { HomeSection } from './HomeSection';
import { Grid, Icon } from 'material-ui';
import { BLUE, LIGHT_BLUE, LIGHT_GREY, HEADER_1, WHITE, RED } from '../../Theme/Theme';
import { Text } from '../Common/Text';
import { Underline } from '../Common/Misc/Underline';

interface Props {

}
interface States {

}
export class ContactSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { } = this.props;
        const { } = this.state;
        return (
            <Grid item md={10} sm={12}>
                <Text style={{ fontSize: "12vw", color: WHITE, fontWeight: 900, lineHeight: "1em", padding: 50 }}>
                    Wanna build something awesome?
                    <p style={{ margin: 0, fontSize: "12vw", color: RED, fontWeight: 900, lineHeight: "1em" }}>
                        Lets Talk! </p>

                </Text>
            </Grid>
        );
    }
} 