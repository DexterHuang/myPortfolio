// @ts-ignore
import flamelink from 'flamelink';
import { mainStore } from '../Store/MainStore';
export class CMSHandler {
    static app: any;
    static init() {

        CMSHandler.app = flamelink({
            apiKey: "AIzaSyDVZc852-8GSDns_tdzZ_om5QCmX9buTbA",
            authDomain: "myportfolio-8e3ae.firebaseapp.com",
            databaseURL: "https://myportfolio-8e3ae.firebaseio.com",
            projectId: "myportfolio-8e3ae",
            storageBucket: "myportfolio-8e3ae.appspot.com",
            messagingSenderId: "934699432630"
        });
    }
    static subscribe(schemaName: string, callback: (data: any[]) => any) {

        CMSHandler.app.content.subscribe(schemaName, function (error, data) {
            if (error) {
                console.error('Something went wrong while retrieving all the content. Details:', error);
                throw (new Error(error));
            }
            if (data) {
                callback(Object.keys(data).map(key => data[key]));
            }
        });
    }
    static getByField(schemaName: string, fieldName: string, fieldValue: string): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await CMSHandler.app.content.getByField(schemaName, fieldName, fieldValue);
                resolve(Object.keys(data).map(key => data[key]));
            } catch (e) {
                reject(e);
            }
        });
    }
}