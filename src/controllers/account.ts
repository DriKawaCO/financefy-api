import { Request, Response } from 'express';
import { Controller, Get } from '../decorators/index.js';

@Controller('/account')
export default class Account {
    @Get()
    public createAccount(req: Request, res: Response): void {
        res.send('Ok');
    }
}
