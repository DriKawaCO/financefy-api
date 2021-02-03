import 'reflect-metadata';

import express, {Express} from 'express';

import BindRoutes from '../utils/routes-binder.js';
import bodyParser from 'body-parser';
import cors from 'cors';

class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.configureCors();
        this.express.use('/', BindRoutes());
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
}

export default App;
