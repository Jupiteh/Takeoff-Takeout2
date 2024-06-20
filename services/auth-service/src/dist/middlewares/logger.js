"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAttempt = void 0;
const fs_1 = __importDefault(require("fs"));
const logAttempt = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}\n`;
    fs_1.default.appendFile('access.log', log, err => {
        if (err)
            console.error('Failed to write log', err);
    });
    next();
};
exports.logAttempt = logAttempt;
