import {Controller, Get} from '../decorators/index.js';
import {Request, Response} from 'express';

@Controller('/account')
export default class Account {
    @Get()
    public createAccount = (req: Request, res: Response): void => {
        res.send('Ok');
    };
}
