import { Request, Response } from 'express';
import { Greet } from '../interfaces/index.js';
import { Greeter } from '../services/index.js';
import {Controller, Get, Post} from '../decorators/index.js';

@Controller('/greet')
export default class HelloWorld {
    public greeterService: Greeter;

    constructor() {
        this.greeterService = new Greeter();
    }

    @Post()
    public greet = (req: Request, res: Response): any => {
        try {
            const greet: Greet = {
                greeting: req.body.greeting,
                speaker: req.body.speaker
            };
            this.greeterService.greet(greet);
            return res.json({ message: 'Greeted successfully!' });
        }
        catch (error) {
            res.status(400).json({
                message: 'Couldn\'t greet.',
                reason: JSON.stringify(error)
            });
        }
    }

    @Get('/last-greet')
    public getLastGreet = (_: Request, res: Response): void => {
        const lastGreeting = this.greeterService.getLastGreeting();
        res.json({ lastGreeting });
    }

    @Get('/last-speaker')
    public getLastSpeaker = (_: Request, res: Response): void => {
        const lastSpeaker = this.greeterService.getLastSpeaker();
        res.json({ lastSpeaker });
    }

    @Get('/last-talk')
    public getLastTalk = (_: Request, res: Response): void => {
        const lastTalk = this.greeterService.getLastTalk();
        res.json({ lastTalk });
    }
}