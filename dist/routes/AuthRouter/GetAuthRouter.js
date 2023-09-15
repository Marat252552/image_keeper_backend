"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./Controller"));
const GetAuthRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/signin', Controller_1.default.signin);
    router.post('/login', Controller_1.default.login);
    router.post('/islogindupl', Controller_1.default.isLoginDupl);
    router.get('/logged', Controller_1.default.isLogged);
    router.get('/refresh', Controller_1.default.refresh);
    router.delete('/logout', Controller_1.default.logout);
    return router;
};
exports.default = GetAuthRouter;
