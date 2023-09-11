"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GenerateTokens = (payload) => {
    let AccessKey = process.env.JWT_ACCESS_KEY;
    let RefreshKey = process.env.JWT_REFRESH_KEY;
    let accessToken = jsonwebtoken_1.default.sign(payload, AccessKey, { expiresIn: '30m' });
    let refreshToken = jsonwebtoken_1.default.sign(payload, RefreshKey, { expiresIn: '1d' });
    return { accessToken, refreshToken };
};
exports.default = GenerateTokens;
