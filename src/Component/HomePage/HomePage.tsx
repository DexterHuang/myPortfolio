import { inject, observer } from 'mobx-react';
import React from 'react';

import { Styles } from '../Modal/Styles';
import { World } from "../../Model/Voxel/World";
import { BlogPostList } from "../Common/BlogPost/BlogPostList";
import { MainStore } from "../../Store/MainStore";
import Grid from 'material-ui/Grid';
import { CONTAINER, PRIMARY_COLOR, BLUE, LIGHT_GREY, GREY, LIGHT_BLACK, LIGHT_BLUE, } from "../../Theme/Theme";
import { NavigationHelper } from '../../Handler/NavigationHelper';
import { Text } from '../Common/Text';
import { BlogCategoryList } from '../Common/BlogPost/BlogCategoryList';
import { HomeSection } from './HomeSection';
import { Tooltip } from 'material-ui';
import { SkillButton } from './SkillButton';
import { Underline } from '../Common/Misc/Underline';
import { ProgramingSection } from './ProgramingSection';
import { LandingSection } from './LandingSection';
import { IntroductionSection } from './IntroductionSection';
import { ContactSection } from './ContactSection';
import { ParallelContainer } from '../Common/Parallel/ParallelContainer';
import { Background1 } from './Background1';
import { Background2 } from './Background2';
import { BackgroundGenerator } from '../../Handler/BackgroundGenerator';
import { Foreground1 } from './Foreground1';
import { BlogSection } from './BlogSection';

interface Props {
    mainStore: MainStore;
}

@inject("mainStore")
@observer
export class HomePage extends React.Component<Props> {

    render() {
        const { mainStore } = this.props;
        return (
            <div style={{ minHeight: 3000 }}>

                {/* <div style={{
                    height: 500, width: 500, backgroundColor: "yellow"
                }} />
                <div style={{ position: "relative", perspective: "2px" }}>
                    <div style={{
                        position: "absolute", height: 50, width: 50,
                        transform: "translateZ(-1px) scale(2)", backgroundColor: "pink"
                    }} />
                </div> */}

                <ParallelContainer
                    background1={<Background1 />}
                    background2={<Background2 />}
                    foreground1={<Foreground1 />}
                    noHeight
                >
                    <LandingSection />
                    <IntroductionSection />
                    <BlogSection postCategories={mainStore.postCategories} />
                    <ProgramingSection />
                    <ContactSection />
                </ParallelContainer>
                {/* <div style={{ paddingTop: 1000, paddingLeft: 100 }} >
                    <div style={{ height: 500, width: 500 }}>
                        <ParallelContainer
                            foreground1={<div style={{
                                position: "absolute", bottom: 0, right: 0,
                                height: 50, width: 50, backgroundColor: "red"
                            }}>things</div>}>
                            <div style={{ backgroundColor: "yellow", width: "100%", height: "100%" }}>
                                content
                            </div>
                        </ParallelContainer>
                    </div>

                </div> */}
            </div>
        );
    }
}