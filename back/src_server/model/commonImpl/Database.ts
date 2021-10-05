import { MongoClient } from "mongodb";


export abstract class Database {
    private static client : MongoClient = null;

    static async connect() : Promise<void> {
        Database.client = await MongoClient.connect(process.env.MONGODB_URL);
    }

    static getClient() : MongoClient  {
        return Database.client;
    }
}

