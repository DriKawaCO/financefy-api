import config from 'config';
import mongoose from 'mongoose';

export default async () => {
    const dbUrl = config.get<string>('api.dbUrl');
    if (!dbUrl) {
        throw new Error('There need to be a DB url set up on the environment variables!');
    }

    const connect = async (): Promise<any> => {
        return mongoose
            .connect(dbUrl, {useNewUrlParser: true})
            .then(() => {
                return console.info(`Successfully connected to DataBase`);
            })
            .catch((error) => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    };

    await connect();
};
