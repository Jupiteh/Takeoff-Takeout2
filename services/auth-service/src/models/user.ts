import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

export interface IUser extends Document {
    ID_User: number;
    username: string;
    password: string;
    email: string;
    role: string;
}

const userSchema: Schema = new Schema({
    ID_User: { type: Number, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'user' },
});

userSchema.plugin(AutoIncrementFactory, { inc_field: 'ID_User' });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
