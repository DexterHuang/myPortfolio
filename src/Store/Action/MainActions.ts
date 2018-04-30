// @ts-ignore
import flamelink from 'flamelink';
import { IBlogPost } from "../../Interface/IBlogPost";
import { mainStore } from "../MainStore";

export class MainActions {

    static async init() {
        const app = flamelink({
            apiKey: "AIzaSyDVZc852-8GSDns_tdzZ_om5QCmX9buTbA",
            authDomain: "myportfolio-8e3ae.firebaseapp.com",
            databaseURL: "https://myportfolio-8e3ae.firebaseio.com",
            projectId: "myportfolio-8e3ae",
            storageBucket: "myportfolio-8e3ae.appspot.com",
            messagingSenderId: "934699432630"
        });
        app.content.subscribe('blogPost', function (error, blogPosts) {
            if (error) {
                return console.error('Something went wrong while retrieving all the content. Details:', error);
            }
            if (blogPosts) {
                mainStore.blogPosts = Object.keys(blogPosts).map(key => blogPosts[key]);
            }
        });
    }
}  