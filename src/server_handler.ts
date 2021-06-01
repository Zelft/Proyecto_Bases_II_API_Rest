import express from 'express';
import config from './config/config'
import morgan from 'morgan';
import mongoose from 'mongoose';

import helmet from 'helmet';
import compressions from 'compression';
import cors from 'cors';

import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'

export class MainServer {

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
        this.app.set('port',config.DB.PORT);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compressions());
        this.app.use(cors());

        
    }
    routes(): void {
        this.app.use (authRoutes);
        this.app.use (specialRoutes);

    }

    start(): void {
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port', this.app.get('port'));
        });

    }
}