import {Inject, Injectable} from '../decorators/index.js';

import GreetService from './greet.service.js';
import {Injectables} from '../constants/index.js';

@Injectable()
class AccountService {
    @Inject(Injectables.GreetService)
    private greetService: GreetService;

    /**
     * Get the Last Talk
     */
    public getLastTalk(): string {
        return this.greetService.getLastTalk();
    }
}

export default AccountService;
