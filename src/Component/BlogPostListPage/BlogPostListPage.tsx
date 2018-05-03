
import React from 'react';
import { NavigationHelper } from '../../Handler/NavigationHelper';
import { BlogPostList } from '../Common/BlogPost/BlogPostList';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../../Store/MainStore';
import { LinearProgress } from 'material-ui';
import { CONTAINER } from '../../Theme/Theme';
interface Props {
    mainStore: MainStore;
}
interface States {

}
@inject("mainStore")
@observer
export class BlogPostListPage extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { mainStore } = this.props;
        const { } = this.state;
        const categoryName = NavigationHelper.getParam(this)['name'].replace(/-/g, " ");
        const category = mainStore.postCategories.find(c => c.name === categoryName);
        console.log(mainStore.blogPosts);
        return (
            category ?
                <div style={{ ...CONTAINER, marginTop: 40 }}>
                    <BlogPostList postList={mainStore.blogPosts.filter(p => p.category === category.id)}
                        onClickPost={post => {
                            NavigationHelper.toBlogPostPage(this, post);
                        }} />
                </div>
                : <LinearProgress />
        );
    }
}
