import DIService from '../services/dependency-injector.js';

export const Inject = (identifier: symbol) => {
    return (target: any, targetKey: string): void => {
        if (!Reflect.hasMetadata('dependencies', target.constructor)) {
            Reflect.defineMetadata('dependencies', [], target.constructor);
        }

        target[targetKey] = DIService.get(identifier)?.service;
    };
};
