import React from 'react';
import { NavigationHelper } from '../../Handler/NavigationHelper';
import { observer, inject } from 'mobx-react';
import { MainStore } from '../../Store/MainStore';
import { CircularProgress, LinearProgress } from 'material-ui';
import { CONTAINER } from '../../Theme/Theme';
import { Text } from '../Common/Text';

interface Props {
    mainStore: MainStore;
}
interface States {

}
@inject("mainStore")
@observer
export class BlogPostDetailPage extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { mainStore } = this.props;
        const { } = this.state;
        let title = NavigationHelper.getParam(this)["title"].replace(/-/g, ' ');
        const post = mainStore.blogPosts.find(b => b.title === title);
        return (post ?
            <div style={{ ...CONTAINER, marginTop: 40 }}>
                <Text style={{ fontSize: 30, fontWeight: 500 }}>
                    {post.title}
                </Text>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            : <div style={{ display: "flex", justifyContent: "center" }}>
                <LinearProgress style={{ width: "100%" }} />
            </div>
        );
    }
} 