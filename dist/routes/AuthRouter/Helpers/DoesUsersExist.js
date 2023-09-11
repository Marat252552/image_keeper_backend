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
const UserModel_1 = __importDefault(require("../../../DataFlow/mongo_database/Models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const FindUserAndComparePassword = (login, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = yield UserModel_1.default.findOne({ login });
            if (!user) {
                res.status(400).json({ message: 'Пользователя с таким логином нет' }).end();
                resolve(false);
                return;
            }
            let isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: 'Неверный пароль' }).end();
                resolve(false);
                return;
            }
            resolve(true);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так' }).end();
            resolve(false);
        }
    }));
});
exports.default = FindUserAndComparePassword;
