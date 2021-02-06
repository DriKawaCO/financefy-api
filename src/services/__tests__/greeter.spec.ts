import {Greet} from '../../interfaces/index.js';
import GreetService from '../greet.service.js';
import {Greetings} from '../../enum/index.js';

describe('[Unit] Greet Service Test Suite', () => {
    it('should create a new instance', () => {
        const greetService = new GreetService();
        expect(greetService).toBeTruthy();
    });

    it('should greet, with proper params', () => {
        const talk = `Excuse me... Sir Jaime would like to say: ${Greetings.GoodEvening}`;
        const greetService = new GreetService();
        const greet: Greet = {
            greeting: Greetings.GoodEvening,
            speaker: 'Jaime'
        };
        greetService.greet(greet);
        expect(greetService.getLastGreeting()).toBe(Greetings.GoodEvening);
        expect(greetService.getLastSpeaker()).toBe('Jaime');
        expect(greetService.getLastTalk()).toBe(talk);
    });

    it('should throw an Error, greeting with no speaker', () => {
        const greetService = new GreetService();
        const greet: Greet = {
            greeting: Greetings.GoodEvening,
            speaker: ''
        };
        expect(() => greetService.greet(greet)).toThrow();
    });
});
