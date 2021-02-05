import mongoose, { Schema, Document } from 'mongoose';

export interface AuthToken extends Document {
    token: string;
    origin: string;
    type: string;
}

const AuthTokenSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model<AuthToken>('AuthToken', AuthTokenSchema);
