import DIService from '../services/dependency-injector.js';
import { Injectables } from '../constants/index.js';

export const Injectable = (): ClassDecorator => {
    return (target: any) => {
        DIService.add({ identifier: Injectables.Greeter, service: target });
        return target;
    };
};
