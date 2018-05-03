import { IBlogPost } from './../Interface/IBlogPost';
import { IPostCategory } from '../Interface/IPostCategory';

export class NavigationHelper {

    static to(dis: any, link: string) {
        dis.props.history.push(link);
    }
    static toBlogPostPage(dis: any, post: IBlogPost) {
        this.to(dis, "/post/" + post.title.replace(/\s/g, "-"));
    }
    static toCategoryPage(dis: any, category: IPostCategory) {
        this.to(dis, "/category/" + category.name.replace(/\s/g, "-"));
    }
    static getParam(dis: any): { [key: string]: string } {
        return dis.props.match.params;
    }
}