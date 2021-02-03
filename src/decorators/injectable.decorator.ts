import DIService from '../services/dependency-injector.js';
import { Injectables } from '../constants/index.js';

export const Injectable = (): ClassDecorator => {
    return (target: any) => {
        if (!Reflect.hasMetadata('injectables', target)) {
            Reflect.defineMetadata('injectables', [], target);
        }

        DIService.add({ identifier: Injectables.Greeter, service: target });
        return target;
    };
};
