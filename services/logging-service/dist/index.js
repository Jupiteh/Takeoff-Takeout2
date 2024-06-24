"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const MONGO_URI = process.env.MONGO_URI || 'mongodb://logging-mongo:27017/logging';
mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
app.post('/logs', (req, res) => {
    const log = req.body;
    console.log('Received log:', log);
    res.status(201).send('Log received');
});
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Logging service running on port ${PORT}`);
});
