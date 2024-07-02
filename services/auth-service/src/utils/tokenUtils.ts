import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export const generateToken = (user: IUser) => {
    const payload = {
        userId: user._id,
        ID_User: user.ID_User, // Ajoutez ce champ
        username: user.username,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        return null;
    }
};
