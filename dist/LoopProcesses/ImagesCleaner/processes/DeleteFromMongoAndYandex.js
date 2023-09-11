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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageModel_1 = __importDefault(require("../../../DataFlow/mongo_database/Models/ImageModel"));
const Actions_1 = require("../../../DataFlow/yandex_cloud/Actions");
const DeleteFromMongoAndYandex = (images) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            try {
                for (var _d = true, images_1 = __asyncValues(images), images_1_1; images_1_1 = yield images_1.next(), _a = images_1_1.done, !_a; _d = true) {
                    _c = images_1_1.value;
                    _d = false;
                    const image = _c;
                    const { _id, key } = image;
                    yield (0, Actions_1.DeleteFile)(key);
                    yield ImageModel_1.default.deleteOne({ _id });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = images_1.return)) yield _b.call(images_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            resolve(null);
        }
        catch (e) {
            console.log(e);
            console.log("DeleteFromMongoAndYandex error");
            reject();
        }
    }));
};
exports.default = DeleteFromMongoAndYandex;
