
import React from 'react';
import { Styles } from '../Modal/Styles';
import { HomeSection } from './HomeSection';
import { Text } from '../Common/Text';
import { Grid } from 'material-ui';
import { BLUE, FLEX_ROW, BLACK, FLEX_COLUMN } from '../../Theme/Theme';
import { ParallelContainer } from '../Common/Parallel/ParallelContainer';
import { View } from '../Common/Misc/View';

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
            <div style={{ ...FLEX_ROW, marginBottom: 300, marginTop: 300 }}>
                <View lg={{ width: "50%" }} md={{ width: "80%" }} xs={{ width: "100%" }}>
                    <ParallelContainer
                        foreground1={<div >
                            <Text style={{ position: "absolute", fontSize: "8em", left: 0, transform: "translate( -70px, 100px)" }}
                                xs={{ transform: "translate( 50px, -100px)" }}
                            >TW</Text>
                            <Text style={{
                                position: "absolute",
                                fontSize: "1.4em", lineHeight: "2em", bottom: 0, right: 0, transform: "translate( 100px, 250px)",
                                width: "80%", backgroundColor: BLACK, padding: 20, boxShadow: "0px 0px 50px black"
                            }} xs={{ width: "90%", transform: "translate( 0px, 200px)" }}>
                                I am software developer,<br />
                                I am interested in all areas in computer programing,<br />
                                from web development to machine learning.
                                I love programming and memes.
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
                </View>
            </div>
        );
    }
}

const styles: Styles = {

};