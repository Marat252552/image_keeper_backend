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
const Actions_1 = require("../../DataFlow/yandex_cloud/Actions");
const TimePeriods_1 = require("../../shared/TimePeriods");
const uuid_1 = require("uuid");
const ImageModel_1 = __importDefault(require("../../DataFlow/mongo_database/Models/ImageModel"));
const FOUR_MEGABYTES = 4000000;
const days_alive = 100;
class Controller {
    addImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.files || !req.files.file) {
                    return res.status(400).json({ message: 'Прикрепите изображение к запросу' });
                }
                const file = req.files.file;
                // Проверка, если каким то образом файл имеет тип не UploadedFile а UploadedFile[]
                if (file instanceof Array) {
                    return res.status(400).json({ message: 'Неверный формат файла' });
                }
                if (file.mimetype.split('/')[0] !== 'image') {
                    return res.status(400).json({ message: 'Поддерживаются только изображения' });
                }
                if (file.size > FOUR_MEGABYTES) {
                    return res
                        .status(413)
                        .json({ message: 'Размер файла не может быть больше 4х Мбайт' });
                }
                let { label = file.name } = req.body;
                const { user_id } = res.locals.TokenPayload;
                const file_name = (0, uuid_1.v4)() + '.' + file.mimetype.split('/')[1];
                let { Location, key } = yield (0, Actions_1.UploadImage)(file.data, file_name);
                let days_in_timestamp_format = days_alive * TimePeriods_1.TWENTY_FOUR_HOURS;
                let expiresAt = Date.now() + days_in_timestamp_format;
                const image = yield ImageModel_1.default.create({
                    file_name,
                    label,
                    expiresAt,
                    key,
                    src: Location,
                    user_id,
                });
                res.status(200).json({ image });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getImages(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = res.locals.TokenPayload;
                let images = yield ImageModel_1.default.find({ user_id }).select({
                    _id: 1,
                    src: 1,
                    label: 1,
                    createdAt: 1,
                });
                res.status(200).json({ images });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image_id: _id } = req.params;
                const { user_id } = res.locals.TokenPayload;
                yield ImageModel_1.default.deleteOne({ user_id, _id });
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    setLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image_id: _id, label } = req.body;
                const { user_id } = res.locals.TokenPayload;
                yield ImageModel_1.default.updateOne({ _id, user_id }, { label });
                const image = yield ImageModel_1.default.findOne({ _id, user_id });
                res.status(200).json({ image });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
