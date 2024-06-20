import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { generateToken } from '../utils/tokenUtils';
import axios from 'axios';

const LOGGING_SERVICE_URL = process.env.LOGGING_SERVICE_URL || 'http://logging-service:3004/logs';

const logMessage = async (message: string, level: string) => {
    try {
        await axios.post(LOGGING_SERVICE_URL, { message, level });
    } catch (err) {
        console.error('Error sending log:', err);
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, password, email, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, role });
        await newUser.save();
        await logMessage(`New user registered: ${username}`, 'info');
        res.status(201).json({ message: 'User created' });
    } catch (err: any) {
        await logMessage(`Failed registration attempt for username: ${username}`, 'warn');
        if (err.code === 11000) {
            res.status(400).json({ message: 'Username or email already exists' });
        } else {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            await logMessage(`Failed login attempt for username: ${username}`, 'warn');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id, user.role);
        await logMessage(`User logged in: ${username}`, 'info');
        res.json({ token });
    } catch (err: any) {
        await logMessage(`Error during login for username: ${username}`, 'error');
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        await logMessage('Fetched all users', 'info');
        res.json(users);
    } catch (err: any) {
        await logMessage('Error fetching users', 'error');
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};
