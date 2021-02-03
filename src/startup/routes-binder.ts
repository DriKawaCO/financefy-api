import {Route, RouteParam} from '../interfaces/index.js';
import express, {Request, Response, Router} from 'express';

import Controllers from '../controllers/index.js';
import {RouteParamType} from '../enum/index.js';

const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

export default function RoutesBinder(): Router {
    const router = express.Router();
    Controllers.forEach((controller) => {
        const instance = new controller();
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes: Array<Route> = Reflect.getMetadata('routes', controller);
        const routeParams: Array<RouteParam> = Reflect.getMetadata('routeParams', controller);

        routes.forEach((route) => {
            router[route.requestMethod](prefix + route.path, async (req: Request, res: Response) => {
                const paramsOnRoute = routeParams
                    ? routeParams.find(({methodName}) => methodName === route.methodName)
                    : null;

                paramsOnRoute?.params.sort((a, b) => {
                    if (a.index < b.index) {
                        return -1;
                    }
                    if (a.index > b.index) {
                        return 1;
                    }
                    return 0;
                });

                const paramsMapper = paramsOnRoute?.params?.length
                    ? paramsOnRoute?.params.map(({type}): any => {
                          const routeParams = {
                              [RouteParamType.REQUEST]: req,
                              [RouteParamType.RESPONSE]: res,
                              [RouteParamType.BODY]: req.body,
                              [RouteParamType.QUERY]: req.query,
                          };

                          return routeParams[type];
                      })
                    : [];

                const result = await (getKeyValue(route.methodName)(instance) as Function).apply(
                    Object.getPrototypeOf(instance),
                    paramsMapper || [],
                );
                return res.send(result);
            });
        });
    });

    return router;
}
