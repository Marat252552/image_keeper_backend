"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OperativeFile = new mongoose_1.Schema({
    file_name: { type: String, unique: true, required: true },
    uid: { type: String, unique: true, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    session_id: { type: String, required: true }
});
const OperativeFileModel = (0, mongoose_1.model)('operative_file', OperativeFile);
exports.default = OperativeFileModel;
