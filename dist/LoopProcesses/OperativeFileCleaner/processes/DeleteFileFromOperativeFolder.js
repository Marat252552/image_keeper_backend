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
const fs_1 = __importDefault(require("fs"));
const GetPathToOperative_1 = __importDefault(require("../../../shared/GetPathToOperative"));
const DeleteFileFromOperativeFolder = (file_name) => {
    return new Promise((resolve, reject) => {
        try {
            fs_1.default.unlink((0, GetPathToOperative_1.default)() + file_name, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.log('ERROR - delete from operative folder');
                    console.log(err);
                    reject();
                }
                else {
                    console.log('SUCCESS - delete from operative folder');
                }
            }));
            resolve(null);
        }
        catch (e) {
            console.log(e);
            reject();
        }
    });
};
exports.default = DeleteFileFromOperativeFolder;
