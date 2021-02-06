import {AuthToken} from './auth-token.interface.js';
import mongoose from 'mongoose';

export interface User {
    _id?: any;
    email: string;
    firstName: string;
    lastName: string;
    hashToken?: string;
    authTokens?: AuthToken['_id'][];
}

interface UserDocument extends User, mongoose.Document {}

const UserSchema: mongoose.Schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        hashToken: {
            type: String
        },
        authTokens: [
            {
                type: mongoose.Schema.Types.ObjectId
            }
        ]
    },
    {timestamps: true}
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
