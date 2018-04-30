import React from 'react';
import { IBlogPost } from "../../../Interface/IBlogPost";
import Button from 'material-ui/Button';
import { Card } from 'material-ui';
import Typography from 'material-ui/Typography';

interface Props {
    postList: IBlogPost[];
}
interface States {

}
export class BlogPostList extends React.Component<Props, States> {
    static defaultProps = {};
    state = {};
    render() {
        const { postList } = this.props;
        const { } = this.state;
        return (
            <div style={{}}>
                {postList.map(p => {
                    return <Card key={p.id} style={{ minHeight: 100, padding: 20, marginBottom: 10 }}>
                        <Typography style={{ fontSize: 16, fontWeight: 400 }}>
                            {p.title}
                        </Typography>
                        {p.summary}
                    </Card>;
                })}
            </div>
        );
    }
}

const styles = {

};