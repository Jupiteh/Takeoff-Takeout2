"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const tokenUtils_1 = require("../utils/tokenUtils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, role } = req.body; // Ensure to include email
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.default({ username, password: hashedPassword, email, role }); // Ensure to include email
        yield newUser.save();
        res.status(201).json({ message: 'User created' });
    }
    catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Username or email already exists' });
        }
        else {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = (0, tokenUtils_1.generateToken)(user._id, user.role);
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});
exports.login = login;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().select('-password'); // Exclude password field
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});
exports.getUsers = getUsers;
