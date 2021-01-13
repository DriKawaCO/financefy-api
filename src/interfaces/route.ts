import { RouteMethods } from '../enum/index.js';

export default interface Route {
  path: string;
  requestMethod: RouteMethods;
  methodName: string;
};
