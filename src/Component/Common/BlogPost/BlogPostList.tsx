import React from 'react';
import { IBlogPost } from "../../../Interface/IBlogPost";
import Button from 'material-ui/Button';
import { Card } from 'material-ui';
import Typography from 'material-ui/Typography';
import { Text } from '../Text';

interface Props {
    postList: IBlogPost[];
    onClickPost: (post: IBlogPost) => any;
    style?: any;
}
interface States {

}
export class BlogPostList extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { postList, onClickPost, style } = this.props;
        const { } = this.state;
        return (
            <div style={style}>
                {postList.map(p => {
                    return <div key={p.id} onClick={() => onClickPost(p)}
                        style={{ marginBottom: 40 }}>
                        <Text style={{ fontSize: "2em", fontWeight: 400 }}>
                            {p.title}
                        </Text>
                        <Text style={{ fontSize: "1em", fontWeight: 400 }}>
                            {p.summary}
                        </Text>
                    </div>;
                })}
            </div>
        );
    }
}

const styles = {

};