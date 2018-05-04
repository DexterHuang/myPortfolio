import React, { CSSProperties } from 'react';
import { HomeSection } from './HomeSection';
import { IPostCategory } from '../../Interface/IPostCategory';
import { ParallelContainer } from '../Common/Parallel/ParallelContainer';
import { Text } from '../Common/Text';
import { Grid } from 'material-ui';
import { Styles } from '../Modal/Styles';
import { LIGHT_BLACK, WHITE, FLEX_ROW, LIGHT_GREY, BLUE, BACKGROUND_TEXT } from '../../Theme/Theme';
import { View } from '../Common/Misc/View';

interface Props {
    postCategories: IPostCategory[];
}
interface States {

}
export class BlogSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    getItems() {
        const { postCategories } = this.props;
        const items: JSX.Element[] = [];
        const flexRight: CSSProperties = {
            display: "flex",
            flexDirection: "row", justifyContent: "flex-end"
        };
        let right = false;
        for (let c of postCategories) {
            right = !right;
            items.push(
                <View key={c.id}
                    style={{
                        width: "100%", display: "flex", flexDirection: "row",
                        justifyContent: right ? "flex-end" : "flex-start", marginBottom: 300
                    }} >
                    <Grid item md={6} sm={12} xs={12} style={{ ...FLEX_ROW }}>
                        <div style={{ height: "500px", width: "300px" }}>
                            <ParallelContainer
                                background1={
                                    <Text style={{
                                        position: "absolute", fontSize: "1.2em", color: WHITE,
                                        padding: 50, width: 300,
                                        ...{ transform: "rotate(-90deg) translate(-400px, -150px)", "transformOrigin": "left top 0" } as any
                                    }}
                                        sm={{ fontSize: "1.2em" }}
                                        xs={{ transform: "rotate(-90deg) translate(0px, -80px)" }}>{c.description}</Text>}
                                foreground1={
                                    <Text style={{
                                        whiteSpace: "pre-wrap", fontSize: "50px",
                                        fontWeight: 800,
                                        width: 50, lineHeight: ".5em",
                                        transform: "translate(80px, 120px)"
                                    }}
                                        xs={{ transform: "translate(50px, -50px)" }}>{c.name}</Text>}>
                                <div style={{ ...FLEX_ROW }}>
                                    <img src={c.image} style={{
                                        height: "500px", width: "100%",
                                        objectFit: "cover", filter: "brightness(80%)", boxShadow: "0px 0px 50px black"
                                    }} />
                                </div>
                            </ParallelContainer>
                        </div>
                    </Grid>
                </View>
            );
        }

        return items;
    }
    render() {
        const { } = this.state;
        return (<div>
            <ParallelContainer
                background1={
                    <Text style={{ ...BACKGROUND_TEXT, width: "100%", textAlign: "left" }}>{"<BLOG>"}</Text>}>
                <div style={{ paddingBottom: 300 }} />
            </ParallelContainer>
            {this.getItems()}

            <ParallelContainer
                background2={
                    <Text style={{ ...BACKGROUND_TEXT, width: "100%", textAlign: "right" }}>{"</BLOG>"}</Text>}>
                <View style={{ paddingTop: 500 }} />
            </ParallelContainer>

        </div>);
    }
}
const styles: Styles = {
    backgroundText: {
        fontWeight: 900, lineHeight: "0.9em",
        paddingRight: 20, paddingLeft: 20, padding: 0
    }
};