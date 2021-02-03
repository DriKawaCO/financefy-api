import {RouteMethods} from '../enum/index.js';
import RouteParam from './route-param.js';

export default interface Route {
    path: string;
    requestMethod: RouteMethods;
    methodName: string;
}
