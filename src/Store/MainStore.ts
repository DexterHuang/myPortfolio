import { IPostCategory } from './../Interface/IPostCategory';

import { observable } from "mobx";
import { IBlogPost } from "../Interface/IBlogPost";

export class MainStore {

    @observable blogPosts: IBlogPost[] = [];

    @observable postCategories: IPostCategory[] = [];
}

export const mainStore = new MainStore();