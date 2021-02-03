import {Controller, Get, Inject} from '../decorators/index.js';
import {Request, Response} from 'express';

import {Greeter} from '../services/index.js';
import {Injectables} from '../constants/index.js';

@Controller('/account')
export default class AccountController {
    @Inject(Injectables.Greeter)
    private greeterService: Greeter;

    @Get()
    public createAccount(): string {
        return this.greeterService.getLastTalk();
    }
}
