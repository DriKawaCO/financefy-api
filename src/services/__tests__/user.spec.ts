import {User} from '../../interfaces/index.js';
import UserService from '../user.service.js';
import connectDb from '../../utils/db-connector.js';

describe('[Unit] User Service Test Suite', () => {
    beforeAll(async () => {
        await connectDb();
    });

    it('should create a new User', async () => {
        const userService = new UserService();
        const user: User = {
            email: 'a@a',
            firstName: 'AAA',
            lastName: 'BBB'
        };
        const baseUser = await userService.create(user);
        expect(baseUser).toBeTruthy();
    });
});
