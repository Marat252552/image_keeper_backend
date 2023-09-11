"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./Controller"));
const CheckAccessToken_1 = __importDefault(require("../../middlewares/CheckAccessToken"));
const GetPinsRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/', CheckAccessToken_1.default, Controller_1.default.addImage);
    router.get('/', CheckAccessToken_1.default, Controller_1.default.getImages);
    router.delete('/:image_id', CheckAccessToken_1.default, Controller_1.default.deleteImage);
    router.post('/label', CheckAccessToken_1.default, Controller_1.default.setLabel);
    return router;
};
exports.default = GetPinsRouter;
