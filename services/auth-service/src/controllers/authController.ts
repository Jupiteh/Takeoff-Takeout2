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
        const token = generateToken(user);  // Passez l'objet user complet
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

export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email, role } = req.body;
    try {
        const updates: any = { username, email, role };
        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await User.findOneAndUpdate({ ID_User: Number(id) }, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        await logMessage(`User updated: ${username}`, 'info');
        res.status(200).json(updatedUser);
    } catch (err: any) {
        await logMessage(`Failed update attempt for user ID: ${id}`, 'warn');
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findOneAndDelete({ ID_User: Number(id) });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        await logMessage(`User deleted: ${deletedUser.username}`, 'info');
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: any) {
        await logMessage(`Failed delete attempt for user ID: ${id}`, 'warn');
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ ID_User: Number(id) }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await logMessage(`Fetched user by ID: ${id}`, 'info');
        res.status(200).json(user);
    } catch (err: any) {
        await logMessage(`Error fetching user by ID: ${id}`, 'error');
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};