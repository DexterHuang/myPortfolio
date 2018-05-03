import { CMSHandler } from './../../Handler/CMSHanlder';
import { IBlogPost } from "../../Interface/IBlogPost";
import { mainStore } from "../MainStore";

export class MainActions {

    static async init() {
        CMSHandler.init();
        CMSHandler.subscribe('blogPost', (data) => {
            mainStore.blogPosts = data;
        });

        CMSHandler.subscribe('postCategory', (data) => {
            mainStore.postCategories = data;
        });
    }
}  