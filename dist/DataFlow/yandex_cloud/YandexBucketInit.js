"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let EasyYandexS3 = require('easy-yandex-s3');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Инициализация
let s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
        secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY,
    },
    Bucket: process.env.YANDEX_BUCKET_NAME,
    debug: true, // Дебаг в консоли, потом можете удалить в релизе
});
exports.default = s3;
