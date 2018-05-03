
import React from 'react';
import { Styles } from '../Modal/Styles';
import { HomeSection } from './HomeSection';
import { Text } from '../Common/Text';
import { Grid } from 'material-ui';
import { BLUE, FLEX_ROW, BLACK, FLEX_COLUMN } from '../../Theme/Theme';
import { ParallelContainer } from '../Common/Parallel/ParallelContainer';

interface Props {

}
interface States {

}
export class IntroductionSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { } = this.props;
        const { } = this.state;
        return (
            <div style={{ ...FLEX_ROW, marginBottom: 300, marginTop: 300, flexWrap: "wrap", marginLeft: 100, marginRight: 100 }}>
                <Grid item lg={6} md={8} sm={12} xs={12}>
                    <ParallelContainer
                        foreground1={<div >
                            <Text style={{ position: "absolute", fontSize: "8em", left: 0, transform: "translate( -70px, 100px)" }}>TW</Text>
                            <Text style={{
                                position: "absolute",
                                fontSize: "1.7em", bottom: 0, right: 0, transform: "translate( 70px, 200px)",
                                width: "70%", backgroundColor: BLACK, padding: 20, boxShadow: "0px 0px 50px black"
                            }}>
                                I am Dexter Huang, a Taiwanese programer/developer currently based in Singapore
                        </Text>
                        </div>}
                    >
                        <div style={{ ...FLEX_COLUMN, width: "100%" }}>
                            <div style={{ width: "100%", height: 500 }} >
                                <img src="https://images.unsplash.com/photo-1519126400611-d57095205936?fit=crop&w=1350&q=80"
                                    style={{
                                        height: 500, width: "100%", objectFit: "cover", boxShadow: "0px 0px 50px black",
                                    }} />
                            </div>
                        </div>
                    </ParallelContainer>

                </Grid>
            </div>
        );
    }
}

const styles: Styles = {

};