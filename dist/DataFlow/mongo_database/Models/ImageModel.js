"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Image = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    file_name: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    src: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: () => Date.now() },
    expiresAt: { type: Date, required: true }
});
// Find images that are already expired according to their days_alive and createdAt values
Image.statics.findExpired = function () {
    let getCurrentDate = () => {
        return Date.now();
    };
    // 'expiresAt' date is lower than 'now' date
    return this.where('expiresAt').lt(getCurrentDate());
};
const ImageModel = (0, mongoose_1.model)('image', Image);
exports.default = ImageModel;
