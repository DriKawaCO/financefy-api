import {Route} from '../interfaces/index.js';
import {RouteMethods} from '../enum/index.js';

function routeBuilder(path: string, method: RouteMethods, target: any, propertyKey: string) {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
        Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<Route>;

    routes.push({
        requestMethod: method,
        path,
        methodName: propertyKey,
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
}

export const Get = (path = '') => {
    return (target: any, propertyKey: string): void => {
        routeBuilder(path, RouteMethods.get, target, propertyKey);
    };
};

export const Post = (path = '') => {
    return (target: any, propertyKey: string): void => {
        routeBuilder(path, RouteMethods.post, target, propertyKey);
    };
};

export const Put = (path = '') => {
    return (target: any, propertyKey: string): void => {
        routeBuilder(path, RouteMethods.put, target, propertyKey);
    };
};

export const Delete = (path = '') => {
    return (target: any, propertyKey: string): void => {
        routeBuilder(path, RouteMethods.delete, target, propertyKey);
    };
};
