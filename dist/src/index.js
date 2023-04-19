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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const user_router_1 = __importDefault(require("../routes/user.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
app.use("/", user_router_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
        .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
        .then(() => console.log("Connected to DataBase successful"))
        .catch((error) => console.log("Failed to connect to DataBase", error));
    app.listen(config_1.config.server.port, () => {
        console.log(`Server started on port ${config_1.config.server.port}`);
    });
});
start();
