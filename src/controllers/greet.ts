import {Response} from 'express';

import {Controller, Get, Post, Inject, Res, Body, Query} from '../decorators/index.js';
import {Greet, GreetResponse} from '../interfaces/index.js';
import {Greeter} from '../services/index.js';
import {Injectables} from '../constants/index.js';
import {Greetings} from '../enum/index.js';

@Controller('/greet')
export default class GreetController {
    @Inject(Injectables.Greeter)
    private greeterService: Greeter;

    @Post()
    public greet(@Body() body: Greet, @Res() res: Response): GreetResponse | undefined {
        try {
            const greet: Greet = body;
            this.greeterService.greet(greet);
            return {message: 'Greeted successfully!'};
        } catch (error) {
            res.status(400).json({
                message: "Couldn't greet.",
                reason: JSON.stringify(error),
            });
        }
    }

    @Get('/last-greet')
    public getLastGreet(@Query() query: any): Greetings | null {
        return this.greeterService.getLastGreeting();
    }

    @Get('/last-speaker')
    public getLastSpeaker(): string {
        return this.greeterService.getLastSpeaker();
    }

    @Get('/last-talk')
    public getLastTalk(): string {
        return this.greeterService.getLastTalk();
    }

    public getKeys(): (keyof GreetController)[] {
        return Object.getPrototypeOf(this);
    }
}
