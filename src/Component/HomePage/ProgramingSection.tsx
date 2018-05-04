import React, { CSSProperties } from 'react';
import { LIGHT_GREY, GREY, HEADER_1, HEADER_2, LIGHT_BLACK, BACKGROUND_TEXT, FLEX_ROW, FLEX_COLUMN } from '../../Theme/Theme';
import { HomeSection } from './HomeSection';
import { Underline } from '../Common/Misc/Underline';
import { Text } from '../Common/Text';
import { Grid } from 'material-ui';
import { SkillButton } from './SkillButton';
import { Styles } from '../Modal/Styles';
import { ParallelContainer } from '../Common/Parallel/ParallelContainer';
import { AnimationActionLoopStyles } from 'three';
import { View } from '../Common/Misc/View';

interface Props {

}
interface States {

}
export class ProgramingSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    getBackground(title: string, textAlign: "right" | "left") {
        return <View
            style={{ transform: "translateY(-200px)", ...FLEX_COLUMN }}
            sm={{ transform: "translateY(-150px)" }}
            xs={{ transform: "translateY(-70px)" }}>
            <Text style={{ ...BACKGROUND_TEXT }}>
                {`<${title}>`}
            </Text>
            <Text style={{ ...BACKGROUND_TEXT, transform: "translateY(200px)" }}>
                {`</${title}>`}
            </Text>
        </View>;
    }
    section(items, side: "right" | "left", title: string) {
        const sideStyle = side === "right" ? styles.sectionRight : styles.sectionLeft;
        return <View
            style={{ ...sideStyle, marginBottom: 700 }}
            md={{ marginBottom: 1000 }}
            sm={{ marginBottom: 600 }}
            xs={{ marginBottom: 0 }} >
            <View style={{ width: "50%" }}
                sm={{ width: "100%" }}>
                <ParallelContainer
                    background2={this.getBackground(title, side)}>
                    {items}
                </ParallelContainer>
            </View>
        </View>;
    }
    render() {
        const { } = this.props;
        const { } = this.state;
        const language = <div style={{ ...FLEX_ROW, flexWrap: "wrap" }}>
            <SkillButton src={require("../../Resouce/images/java.webp")} title="Java"
                url="https://java.com/en/" />

            <SkillButton src={require("../../Resouce/images/cSharp.webp")} title="c#"
                url="https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/" />

            <SkillButton src={require("../../Resouce/images/python.webp")} title="Python"
                url="https://www.python.org/"
                style={{ padding: "20px", height: 100 }} />

            <SkillButton src={require("../../Resouce/images/javascript.webp")} title="Javascript"
                url="https://www.javascript.com/"
                style={{ height: 120 }} />

            <SkillButton src={require("../../Resouce/images/typescript.svg")} title="TypeScript"
                url="https://www.typescriptlang.org/"
                style={{ height: 90 }} />
        </div>;
        const web = <div style={{ ...FLEX_ROW, flexWrap: "wrap" }}>
            <SkillButton src={require("../../Resouce/images/nodejs.webp")} title="Node.js"
                url="https://nodejs.org/en/"
                style={{ height: 90 }} />
            <SkillButton src={require("../../Resouce/images/react.png")} title="React.js"
                url="https://reactjs.org/" />

            <SkillButton src={require("../../Resouce/images/angular2.png")} title="Angular2"
                url="https://angular.io/"
                style={{ height: 90 }} />
        </div>;
        const mobile = <div style={{ ...FLEX_ROW, flexWrap: "wrap" }}>
            <SkillButton src={require("../../Resouce/images/react_native.png")} title="React Native"
                url="https://facebook.github.io/react-native/"
                style={{ height: 90 }} />
            <SkillButton src={require("../../Resouce/images/ionic.png")} title="Ionic 2"
                url="https://ionicframework.com/"
                style={{ height: 90 }} />
            <SkillButton src={require("../../Resouce/images/android.png")} title="Android"
                url="https://www.android.com/"
                style={{ height: 100 }} />
        </div>;
        const ai = <div style={{ ...FLEX_ROW, flexWrap: "wrap" }}>
            <SkillButton src={require("../../Resouce/images/keras.png")} title="Keras"
                url="https://keras.io/"
                style={{ height: 90 }} />
            <SkillButton src={require("../../Resouce/images/tensorflow.png")} title="Ionic 2"
                url="https://www.tensorflow.org/"
                style={{ height: 120 }} />
            <SkillButton src={require("../../Resouce/images/sklearn.png")} title="Android"
                url="http://scikit-learn.org/"
                style={{ height: 90 }} />
        </div>;
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                    <Grid item md={6} sm={12} >
                        <Underline>
                            <Text style={{ ...HEADER_1, paddingBottom: 0 }}>#iLoveProgramming</Text>
                        </Underline>
                        <Text style={{ textAlign: "center" }}>
                            Coding has always been my biggest hobby since when I was a child,
                basically I couldn't stop myself from learning new framework and languages!</Text>
                    </Grid>
                </div>
                {this.section(language, "right", "language")}
                {this.section(web, "left", "web_tech")}
                {this.section(mobile, "right", "mobile")}
                {this.section(ai, "left", "AI")}
            </div >
        );
    }
}
const gap = 300;
const styles: Styles = {
    skillButtonSection: {
        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
        flexWrap: "wrap", width: "100%"
    },
    sectionRight: {
        marginTop: gap, marginBottom: gap, display: "flex", flexDirection: "row", width: "100%",
        alignItems: "center", justifyContent: "flex-end",
    },
    sectionLeft: {
        marginTop: gap, marginBottom: gap, display: "flex", flexDirection: "row", width: "100%",
        alignItems: "center", justifyContent: "flex-start"
    },
    backgroundText: {
        fontSize: "15vw", color: LIGHT_BLACK, fontWeight: 900, lineHeight: "0.9em",
        paddingRight: 20, paddingLeft: 20, padding: 0
    }
};