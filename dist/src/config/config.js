"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL || "";
const SERVER_PORT = process.env.SERVER_PORT || 4444;
exports.config = {
    mongo: {
        url: DB_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
