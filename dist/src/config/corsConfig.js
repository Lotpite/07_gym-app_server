"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowCors = void 0;
const allowCors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS, DELETE");
    //Preflight CORS handler
    if (req.method === "OPTIONS") {
        return res.status(200).json({
            body: "OK",
        });
    }
    next();
};
exports.allowCors = allowCors;
