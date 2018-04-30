
import { observable } from "mobx";
import { IBlogPost } from "../Interface/IBlogPost";

export class MainStore {

    @observable blogPosts: IBlogPost[] = [];

}

export const mainStore = new MainStore();