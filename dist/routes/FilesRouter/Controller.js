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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const TimePeriods_1 = require("../../shared/TimePeriods");
const FOUR_MEGABYTES = 4000000;
class Controller {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { file } = req.files;
                let { session_id, uid } = req.body;
                // if(!session_id || !uid || !file) return res.sendStatus(400)
                // if (file.size > FOUR_MEGABYTES) {
                //     return res.status(413).json({ message: 'Размер файла не может быть больше 4х Мбайт' })
                // }
                // Time in future when this file should be auto deleted if not used
                let expiresAt = Date.now() + TimePeriods_1.ONE_HOUR;
                let file_name = (0, uuid_1.v4)() + '.' + file.mimetype.split('/')[1];
                // await OperativeFileModel.create({
                //     file_name, expiresAt, session_id, uid
                // })
                // file.mv(GetPathToOperativeFolder() + file_name)
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
