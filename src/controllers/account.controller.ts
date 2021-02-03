import {Controller, Get, Inject} from '../decorators/index.js';

import {AccountService} from '../services/index.js';
import {Injectables} from '../constants/index.js';

@Controller('/account')
export default class AccountController {
    @Inject(Injectables.AccountService)
    private accountService: AccountService;

    @Get()
    public getLastTalk(): string {
        return this.accountService.getLastTalk();
    }
}
