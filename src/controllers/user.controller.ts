import { Injectables } from '../constants/index.js';
import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Path,
    Post,
    Put
} from '../decorators/index.js';
import { User } from '../interfaces/index.js';
import { UserService } from '../services/index.js';

@Controller('/user')
export default class UserController {
    @Inject(Injectables.UserService)
    private userService: UserService;

    @Post()
    public create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Get('/:id')
    public findById(@Path('id') id: string): Promise<User | null> {
        return this.userService.findById(id);
    }

    @Put('/:id')
    public update(@Path('id') id: string, @Body() user: User): Promise<User | null> {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    public delete(@Path('id') id: string): Promise<boolean> {
        return this.userService.delete(id);
    }
}
