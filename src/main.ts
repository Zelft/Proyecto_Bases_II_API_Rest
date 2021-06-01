import express from 'express';
import config from './config/config'
import mongoose from 'mongoose';

class MainServer {

    public app: express.Application;

    constructor () {
        this.app = express();
        this.config();
        this.start();
    }


    config(): void {
        const MONGODB_URI = config.DB.URI;
        mongoose.set('useFindAndModify', true)
        mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useCreateIndex: true
        }).then(db => console.log ('db is connected'));

        
    }

    routes(): void {

    }

    start(): void {

    }

}