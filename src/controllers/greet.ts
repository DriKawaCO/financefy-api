import { Request, Response } from 'express';

import { Controller, Get, Post, Inject } from '../decorators/index.js';
import { Greet } from '../interfaces/index.js';
import { Greeter } from '../services/index.js';
import { Injectables } from '../constants/index.js';
import { Greetings } from '../enum/index.js';

@Controller('/greet')
export default class HelloWorld {
    @Inject(Injectables.Greeter)
    private greeterService: Greeter;

    @Post()
    public greet = (req: Request, res: Response): any => {
        try {
            const greet: Greet = {
                greeting: req.body.greeting,
                speaker: req.body.speaker,
            };
            this.greeterService.greet(greet);
            return { message: 'Greeted successfully!' };
        } catch (error) {
            res.status(400).json({
                message: "Couldn't greet.",
                reason: JSON.stringify(error),
            });
        }
    };

    @Get('/last-greet')
    public getLastGreet = (): Greetings | null => {
        return this.greeterService.getLastGreeting();
    };

    @Get('/last-speaker')
    public getLastSpeaker = (): string => {
        return this.greeterService.getLastSpeaker();
    };

    @Get('/last-talk')
    public getLastTalk = (): string => {
        return this.greeterService.getLastTalk();
    };
}
