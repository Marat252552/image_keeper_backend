"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const GetImagesRouter_1 = __importDefault(require("./routes/ImageRouter/GetImagesRouter"));
const ImagesCleaner_1 = __importDefault(require("./LoopProcesses/ImagesCleaner/ImagesCleaner"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const GetAuthRouter_1 = __importDefault(require("./routes/AuthRouter/GetAuthRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonBodyMiddleware = express_1.default.json();
exports.corsOptions = {
    origin: ['https://image-keeper-frontend.onrender.com', 'http://localhost:5173'],
    credentials: true,
    optionSuccessStatus: 200
};
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)({}));
app.use((0, cors_1.default)(exports.corsOptions));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(jsonBodyMiddleware);
const ImagesRouter = (0, GetImagesRouter_1.default)();
const AuthRouter = (0, GetAuthRouter_1.default)();
app.use('/images', ImagesRouter);
app.use('/auth', AuthRouter);
(0, ImagesCleaner_1.default)();
exports.default = app;
