"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const UserModel = (0, mongoose_1.model)('user', User);
exports.default = UserModel;
