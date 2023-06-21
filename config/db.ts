import { MongoClient } from "mongodb";

export default class db {

    readonly uri: string
    client: MongoClient

    constructor(uri: string) {
        this.uri = uri;
        this.client = new MongoClient(uri);
    }

    async run () {
        try{
            const database = this.client.db('cluster0');
        }catch(e) {
            console.log(e)
        }finally{
            console.log('connected !')
            await this.client.close();
        }
    }

}