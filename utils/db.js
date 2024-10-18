import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || "localhost";
        const port = process.env.DB_PORT || "27017";
        this.database = process.env.DB_DATABASE || "file_manager";
        const url = `mongodb://${host}:${port}/${this.database}`;
        console.log(url);
        this.client = new MongoClient(url) 
        this.connected = false;
        this.client.connect().then(() => {
            this.connected = true;
        })
    }
    isAlive() {
        return this.connected;
    }

    async nbUsers() {
        await this.client.connect();
        const db = this.client.db(this.database);
        const count = await db.collection("User").countDocuments({});
        return count
    }

    async nbFiles() {
        await this.client.connect();
        const db = this.client.db(this.database);
        const count = await db.collection("files").countDocuments({});
        return count;
    }
}

const dbClient = new DBClient();
export default dbClient;