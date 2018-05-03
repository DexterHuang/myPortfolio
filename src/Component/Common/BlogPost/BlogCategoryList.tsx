
import React from 'react';
import { IPostCategory } from '../../../Interface/IPostCategory';
import { Card, CardMedia, CardContent } from 'material-ui';
import { Text } from '../Text';
interface Props {
    categories: IPostCategory[];
    onClickCategory: (category: IPostCategory) => any;
}
interface States {

}
export class BlogCategoryList extends React.Component<Props, States> {
    static defaultProps = { categories: [] };
    state = {};
    render() {
        const { categories, onClickCategory } = this.props;
        const { } = this.state;
        if (categories.length > 0) {
            console.log(categories[0].image);
        }
        return (
            categories.map(c => (
                <Card key={c.name} style={{ width: 355 }} onClick={() => onClickCategory(c)} >
                    <CardMedia image={c.image} style={{ height: 200, width: 355 }} />
                    <CardContent>
                        <Text style={{ fontSize: "1.5em" }}>{c.name}</Text>
                        <Text style={{ fontSize: "1em" }}>{c.description}</Text>
                    </CardContent>
                </Card>
            ))
        );
    }
} 