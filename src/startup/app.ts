import 'reflect-metadata';

import express, { Express } from 'express';

import BindRoutes from '../utils/routes-binder.js';
import ConnectDB from '../utils/db-connector.js';
import bodyParser from 'body-parser';
import cors from 'cors';

class App {
    public express: Express;

    constructor() {
        this.express = express();
    }

    /**
     * Build the App - Routes and DB launch
     */
    public async build(): Promise<void> {
        this.configureCors();
        this.express.use('/', BindRoutes());
        await ConnectDB();
    }

    private configureCors(): void {
        this.express.use(
            bodyParser.urlencoded({
                extended: true,
                limit: '5mb'
            })
        );
        this.express.use(
            bodyParser.json({
                limit: '25mb'
            })
        );
        this.express.use(cors());
    }
}

export default App;
