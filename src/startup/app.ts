import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import cors from 'cors';
import RoutesBinder from './routes-binder.js';

class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.configureCors();
        this.bindRoutes();
    }

    private configureCors(): void {
        this.express.use(
            bodyParser.urlencoded({
                extended: false,
                limit: '5mb',
            }),
        );
        this.express.use(
            bodyParser.json({
                limit: '25mb',
            }),
        );
        this.express.use(cors());
    }

    private bindRoutes(): void {
        this.express.use('/', RoutesBinder());
    }
}

export default App;
