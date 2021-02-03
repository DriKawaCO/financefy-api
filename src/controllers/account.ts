import { Controller, Get, Inject } from '../decorators/index.js';
import { Greeter } from '../services/index.js';
import { Injectables } from '../constants/index.js';
import { Request, Response } from 'express';

@Controller('/account')
export default class Account {
    @Inject(Injectables.Greeter)
    private greeterService: Greeter;

    @Get()
    public createAccount = (): string => {
        return this.greeterService.getLastTalk();
    };
}
