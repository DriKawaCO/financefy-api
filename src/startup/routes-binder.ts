import express, {Router, Request, Response} from 'express';
import Controllers from '../controllers/index.js';
import {Route} from '../interfaces/index.js';
import HelloWorld from '../controllers/greet.js';

const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

export default function RoutesBinder(): Router {
    const router = express.Router();
    Controllers.forEach((controller) => {
        const instance = new HelloWorld();
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes: Array<Route> = Reflect.getMetadata('routes', controller);

        routes.forEach((route) => {
            const method = getKeyValue(route.methodName)(instance);
            router[route.requestMethod](prefix + route.path, (req: Request, res: Response) => {
                method(req, res);
            });
        });
    });

    return router;
}
