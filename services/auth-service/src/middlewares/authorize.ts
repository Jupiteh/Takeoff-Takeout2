import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

interface AuthRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    console.log("Auth header:", authHeader); // Debug log

    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token decoded successfully:", decoded); // Debug log
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Invalid Token:", err); // Debug log
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const authorizeRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        console.log("User role:", req.user?.role); // Debug log

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    }
};
