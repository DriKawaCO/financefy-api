import {RouteParam} from '../interfaces/index.js';
import {RouteParamType} from '../enum/index.js';

function routeParamBuilder(paramType: RouteParamType, target: any, propertyKey: string, index: number) {
    if (!Reflect.hasMetadata('routeParams', target.constructor)) {
        Reflect.defineMetadata('routeParams', [], target.constructor);
    }

    const routeParams = Reflect.getMetadata('routeParams', target.constructor) as Array<RouteParam>;
    const requestRouteParamIdx = routeParams.findIndex((route) => route.methodName === propertyKey);
    let requestRouteParam = routeParams[requestRouteParamIdx];

    if (!requestRouteParam) {
        requestRouteParam = {
            methodName: propertyKey,
            params: [
                {
                    index,
                    type: paramType,
                },
            ],
        };
        routeParams.push(requestRouteParam);
    } else {
        requestRouteParam.params.push({
            index,
            type: paramType,
        });
        routeParams[requestRouteParamIdx] = requestRouteParam;
    }

    Reflect.defineMetadata('routeParams', routeParams, target.constructor);
}

export const Req = () => {
    return (target: any, propertyKey: string, index: number): void => {
        routeParamBuilder(RouteParamType.REQUEST, target, propertyKey, index);
    };
};

export const Res = () => {
    return (target: any, propertyKey: string, index: number): void => {
        routeParamBuilder(RouteParamType.RESPONSE, target, propertyKey, index);
    };
};

export const Body = () => {
    return (target: any, propertyKey: string, index: number): void => {
        routeParamBuilder(RouteParamType.BODY, target, propertyKey, index);
    };
};

export const Query = () => {
    return (target: any, propertyKey: string, index: number): void => {
        routeParamBuilder(RouteParamType.QUERY, target, propertyKey, index);
    };
};
