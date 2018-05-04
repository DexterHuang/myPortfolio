import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HomePage } from './Component/HomePage/HomePage';
import { VoxelPage } from './Component/Voxel/VoxelPage';
import { Text } from './Component/Common/Text';
import { BlogPostDetailPage } from './Component/BlogPostDetailPage/BlogPostDetailPage';
import { BlogPostListPage } from './Component/BlogPostListPage/BlogPostListPage';
import { NavigationHelper } from './Handler/NavigationHelper';
import { CONTAINER, BLACK } from './Theme/Theme';
import { Logo } from './Component/Common/Misc/Logo';

interface Props {

}
interface States {
    width: number;
}
export class App extends React.Component<Props, States> {
    state = {
        width: window.innerWidth
    };
    componentDidMount() {
        let potato = 0;
        window.addEventListener("mousewheel", (e) => {
            potato += e.wheelDeltaY;
            e.preventDefault();
        });
        const animate = () => {
            requestAnimationFrame(animate);
            const d = potato / 10;
            if (Math.abs(d) > 0.1) {
                window.scrollTo({
                    top: window.scrollY - d
                });
            }
            potato -= d;
        };
        animate();

        window.addEventListener("resize", () => {
            this.setState({ width: window.innerWidth });
        });
    }
    render() {
        const { width } = this.state;
        return (
            <Router>
                <div style={{ backgroundColor: BLACK, overflow: "hidden" }}>
                    <div style={{ height: 70, }}>
                        <div style={{
                            paddingLeft: 50, paddingRight: 50,
                            flexDirection: "row", display: "flex", height: "100%"
                        }}>
                            <Link to="">
                                <Logo />
                            </Link>
                        </div>
                    </div>
                    <div style={{ minHeight: window.innerHeight - 70, paddingBottom: 400 }}>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/Voxel" component={VoxelPage} />
                        <Route exact path="/post/:title" component={BlogPostDetailPage} />
                        <Route exact path="/category/:name" component={BlogPostListPage} />
                    </div>
                </div>
            </Router>
        );
    }
}   