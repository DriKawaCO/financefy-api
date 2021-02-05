import { Injectable } from '../decorators/index.js';
import { User, UserModel } from '../interfaces/index.js';

@Injectable()
export default class UserService {
    /**
     * Create a User
     * @param user 
     */
    public create(user: User): Promise<User> {
        return UserModel.create(user);
    }

    /**
     * Find a User by Id
     * @param id 
     */
    public async findById(id: string): Promise<User | null> {
        return UserModel.findById(id);
    }

    /**
     * Update a User by Id
     * @param id 
     */
    public async update(id: string, user: User): Promise<User | null> {
        return UserModel.findByIdAndUpdate(id, user);
    }

    /**
     * Remove a User by Id
     * @param id 
     */
    public async delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndRemove(id, null, (error, doc) => {
                if (!error && doc) {
                    resolve(true);
                    return;
                }

                reject(false);
            });
        });
    }
}
