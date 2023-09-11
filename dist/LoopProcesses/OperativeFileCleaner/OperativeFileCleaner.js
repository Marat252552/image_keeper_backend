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
const OperativeFileModel_1 = __importDefault(require("../../DataFlow/mongo_database/Models/OperativeFileModel"));
const TimePeriods_1 = require("../../shared/TimePeriods");
const DeleteFileFromOperativeFolder_1 = __importDefault(require("./processes/DeleteFileFromOperativeFolder"));
const DeleteFileFromMongoDatabaseById_1 = __importDefault(require("./processes/DeleteFileFromMongoDatabaseById"));
const OperativeFilesCleaner = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let files = yield OperativeFileModel_1.default.find();
            if (!files)
                return;
            files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
                let { _id, expiresAt, file_name } = file;
                if (+expiresAt <= Date.now()) {
                    yield (0, DeleteFileFromOperativeFolder_1.default)(file_name);
                    yield (0, DeleteFileFromMongoDatabaseById_1.default)(_id.toString());
                }
            }));
        }
        catch (e) {
            console.log(e);
        }
    }), TimePeriods_1.TEN_MINUTES);
};
exports.default = OperativeFilesCleaner;
