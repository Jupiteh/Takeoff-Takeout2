import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const logAttempt = (req: Request, res: Response, next: NextFunction) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}\n`;
    fs.appendFile('access.log', log, err => {
        if (err) console.error('Failed to write log', err);
    });
    next();
};
