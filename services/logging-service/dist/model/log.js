"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logSchema = new mongoose_1.Schema({
    message: { type: String, required: true },
    level: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
const Log = (0, mongoose_1.model)('Log', logSchema);
exports.default = Log;
