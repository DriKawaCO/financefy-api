import DIService from '../services/dependency-injector.js';

export const Inject = (identifier: symbol) => {
    return (target: any, targetKey: string): void => {
        target[targetKey] = DIService.get(identifier)?.service;
    };
};
