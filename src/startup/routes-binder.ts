import express, { Request, Response, Router } from 'express';

import Controllers from '../controllers/index.js';
import { Route } from '../interfaces/index.js';

const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

export default function RoutesBinder(): Router {
    const router = express.Router();
    Controllers.forEach((controller) => {
        const instance = new controller();
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes: Array<Route> = Reflect.getMetadata('routes', controller);

        routes.forEach((route) => {
            const method = getKeyValue(route.methodName)(instance);
            router[route.requestMethod](prefix + route.path, async (req: Request, res: Response) => {
                const result = await method(req, res);
                res.send(result);
            });
        });
    });

    return router;
}
