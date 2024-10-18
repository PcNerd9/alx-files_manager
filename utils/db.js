import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || "localhost";
        const port = process.env.DB_PORT || "27017";
        this.database = process.env.DB_DATABASE || "file_manager";
        const url = `mongodb://${host}:${port}/${this.database}`;
        this.client = new MongoClient(url) 
        this.connected = false;
        this.client.on("connect", () => {
            this.connected  = true;
        })
    }
    isAlive() {
        return this.connected;
    }

    async nbUsers() {
        const db = this.client.db(this.database);
        const count = await db.collection("User").countDocuments({});
        return count
    }

    async nbFiles() {
        const db = this.client.db(this.database);
        const count = await db.collection("files").countDocuments({});
        return count;
    }
}

const dbClient = new DBClient();
export default dbClient;