/*

    Require modules

*/

const http = require('http');
const https = require('https');

const { config } = require('dotenv');
config();

import { MongoClient } from "../node_modules/mongodb/mongodb";
//@ts-ignore
const { MongoClient } = require('mongodb');


/*

    Setup server

*/

const server = http.createServer().listen(8080);
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.sockets.on('connection',(socket: any) => {
    socket.on('test', () => {
        
    });
});

/* Database */

class DB {
    private static _instance: DB;

    public static getInstance(): DB {
        if(!DB._instance) DB._instance = new DB();
        return DB._instance;
    }
    constructor() {}

    private mongoClient: MongoClient;

    public async connectToCluster() {
        try {
            this.mongoClient = new MongoClient(process.env.DATABASE_URI);
            await this.mongoClient.connect();
        
            return true;
        } catch (error) {
            console.error('Connection to MongoDB Atlas failed!', error);

            return false;
        }
    }
}

/* Analitics */

class Analitics {
    private static _instance: Analitics;

    public static getInstance(): Analitics {
        if(!Analitics._instance) Analitics._instance = new Analitics();
        return Analitics._instance;
    }

    constructor() {}
}

/* Main */

async function main() {
    let db = DB.getInstance();

    let result = await db.connectToCluster();
    if(!result) process.abort();

    let analitics = Analitics.getInstance();
}

main();