import React, { CSSProperties } from 'react';
import { LIGHT_GREY, GREY, HEADER_1, HEADER_2, LIGHT_BLACK, BACKGROUND_TEXT } from '../../Theme/Theme';
import { HomeSection } from './HomeSection';
import { Underline } from '../Common/Misc/Underline';
import { Text } from '../Common/Text';
import { Grid } from 'material-ui';
import { SkillButton } from './SkillButton';
import { Styles } from '../Modal/Styles';
import { ParallelContainer } from '../Common/Parallel/ParallelContainer';
import { AnimationActionLoopStyles } from 'three';

interface Props {

}
interface States {

}
export class ProgramingSection extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    getBackground(title: string, textAlign: "right" | "left") {
        let style: CSSProperties = textAlign === "left" ? styles.sectionLeft : styles.sectionRight;
        style = { ...style, marginTop: 0, marginBottom: 0, transform: "translateY(-150px)" };

        return <div style={style}>
            <Text style={{ ...BACKGROUND_TEXT, textAlign }}>
                {`<${title}>
                </${title}>`}
            </Text>
        </div>;
    }
    render() {
        const { } = this.props;
        const { } = this.state;
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
                <div style={{ ...styles.sectionRight, marginTop: 300, marginBottom: 500 }}>
                    <Grid item md={6} sm={12}>
                        <ParallelContainer
                            background2={this.getBackground("language", "right")}>
                            <div style={{ ...styles.skillButtonSection }}>
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
                            </div>
                        </ParallelContainer>
                    </Grid>
                </div>
                <ParallelContainer
                    background2={this.getBackground("web_tech", "left")}>
                    <div style={styles.sectionLeft}>
                        <Grid item md={6} sm={12} style={styles.skillButtonSection}>
                            <SkillButton src={require("../../Resouce/images/nodejs.webp")} title="Node.js"
                                url="https://nodejs.org/en/"
                                style={{ height: 90 }} />
                            <SkillButton src={require("../../Resouce/images/react.png")} title="React.js"
                                url="https://reactjs.org/" />

                            <SkillButton src={require("../../Resouce/images/angular2.png")} title="Angular2"
                                url="https://angular.io/"
                                style={{ height: 90 }} />
                        </Grid>
                    </div>
                </ParallelContainer>

                <ParallelContainer
                    background2={this.getBackground("mobile", "right")}>
                    <div style={styles.sectionRight}>
                        <Grid item md={6} sm={12} style={styles.skillButtonSection}>
                            <SkillButton src={require("../../Resouce/images/react_native.png")} title="React Native"
                                url="https://facebook.github.io/react-native/"
                                style={{ height: 90 }} />
                            <SkillButton src={require("../../Resouce/images/ionic.png")} title="Ionic 2"
                                url="https://ionicframework.com/"
                                style={{ height: 90 }} />
                            <SkillButton src={require("../../Resouce/images/android.png")} title="Android"
                                url="https://www.android.com/"
                                style={{ height: 100 }} />
                        </Grid>
                    </div>
                </ParallelContainer>

                <ParallelContainer
                    background2={this.getBackground("AI", "left")}>
                    <div style={{ ...styles.sectionLeft, marginBottom: 300 }}>
                        <Grid item md={6} sm={12} style={{ ...styles.skillButtonSection, marginBottom: 0 }}>
                            <SkillButton src={require("../../Resouce/images/keras.png")} title="Keras"
                                url="https://keras.io/"
                                style={{ height: 90 }} />
                            <SkillButton src={require("../../Resouce/images/tensorflow.png")} title="Ionic 2"
                                url="https://www.tensorflow.org/"
                                style={{ height: 120 }} />
                            <SkillButton src={require("../../Resouce/images/sklearn.png")} title="Android"
                                url="http://scikit-learn.org/"
                                style={{ height: 90 }} />
                        </Grid>
                    </div>
                </ParallelContainer>
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