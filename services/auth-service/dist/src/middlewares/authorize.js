"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authenticateJWT = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        console.log("Token decoded successfully:", decoded); // Debug log
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Invalid Token:", err); // Debug log
        res.status(400).json({ message: 'Invalid Token' });
    }
};
exports.authenticateJWT = authenticateJWT;
const authorizeRole = (roles) => {
    return (req, res, next) => {
        var _a;
        console.log("User role:", (_a = req.user) === null || _a === void 0 ? void 0 : _a.role); // Debug log
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
