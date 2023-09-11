"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./Controller"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const GetFilesRouter = () => {
    const router = (0, express_1.Router)();
    router.use((0, express_fileupload_1.default)({}));
    router.post('/', Controller_1.default.uploadFile);
    return router;
};
exports.default = GetFilesRouter;
