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
const UserModel_1 = __importDefault(require("../../DataFlow/mongo_database/Models/UserModel"));
const GenerateTokens_1 = __importDefault(require("./Helpers/GenerateTokens"));
const IsLoginDuplicated_1 = __importDefault(require("./Helpers/IsLoginDuplicated"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Controller {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                if (!login || !password) {
                    return res.status(400).json({ message: 'Не все поля заполнены' });
                }
                if (yield (0, IsLoginDuplicated_1.default)(login)) {
                    return res.status(400).send({ message: 'Логин занят' });
                }
                let hashPassword = bcrypt_1.default.hashSync(password, 7);
                let user = yield UserModel_1.default.create({
                    login, password: hashPassword
                });
                let { _id } = user;
                let { accessToken, refreshToken } = (0, GenerateTokens_1.default)({ user_id: _id.toString(), login });
                res
                    .status(201)
                    .cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                    .json({ user, accessToken });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { login, password, remember = true } = req.body;
                let user = yield UserModel_1.default.findOne({ login });
                if (!user) {
                    res.status(400).json({ message: 'Пользователя с таким логином нет' }).end();
                    return;
                }
                let isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
                if (!isPasswordValid) {
                    res.status(400).json({ message: 'Неверный пароль' }).end();
                    return;
                }
                let { _id } = user;
                let { accessToken, refreshToken } = (0, GenerateTokens_1.default)({ user_id: _id.toString(), login });
                if (remember) {
                    res
                        .status(200)
                        .cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'Strict' })
                        .json({ accessToken }).end();
                    return;
                }
                res
                    .status(200)
                    .json({ accessToken }).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500).end();
            }
        });
    }
    isLoginDupl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { login } = req.body;
                let user = yield UserModel_1.default.findOne({ login });
                if (user)
                    return res.status(200).json({ response: true }).end();
                res.status(200).json({ response: false }).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(200).end();
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let RefreshToken = req.cookies.refreshToken;
                if (!RefreshToken)
                    return res.sendStatus(400);
                let isTokenValid = jsonwebtoken_1.default.verify(RefreshToken, process.env.JWT_REFRESH_KEY);
                if (!isTokenValid)
                    return res.sendStatus(400);
                let { login } = isTokenValid;
                let user = yield UserModel_1.default.findOne({ login });
                if (!user) {
                    res.status(400).json({ message: 'Пользователя с таким логином нет' }).end();
                    return;
                }
                let { _id } = user;
                let { accessToken, refreshToken } = (0, GenerateTokens_1.default)({ user_id: _id.toString(), login });
                res
                    .status(200)
                    .cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                    .json({ accessToken });
            }
            catch (e) {
                console.log(e);
                res.status(401).json({ message: 'Пользователь не авторизован' });
            }
        });
    }
    isLogged(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization) {
                    return res.sendStatus(401);
                }
                let accessToken = req.headers.authorization.split(' ')[1];
                let token = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_KEY);
                let { login } = token;
                let user = yield UserModel_1.default.findOne({ login });
                if (!user) {
                    return res.sendStatus(403);
                }
                res.status(200).json({ accessToken });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(403);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('refreshToken').status(200).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
