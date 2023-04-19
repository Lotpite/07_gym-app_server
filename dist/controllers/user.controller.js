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
exports.addTrainToUser = exports.deleteUser = exports.loginUser = exports.createUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    return yield user_model_1.default
        .findOne({ email })
        .then((candidate) => {
        if (candidate) {
            res.json({ message: `User ${email} already exists` });
        }
        else {
            new user_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gym: {
                    trainings: [
                        {
                            id: "4/13/2023",
                            exercises: [
                                {
                                    id: "pushup",
                                    total: 0,
                                    sets: [
                                        { order: 1, activated: false, reps: 0 },
                                        { order: 2, activated: false, reps: 0 },
                                        { order: 3, activated: false, reps: 0 },
                                        { order: 4, activated: false, reps: 0 },
                                        { order: 5, activated: false, reps: 0 },
                                    ],
                                    active: false,
                                },
                                {
                                    id: "squats",
                                    total: 0,
                                    sets: [
                                        { order: 1, activated: false, reps: 0 },
                                        { order: 2, activated: false, reps: 0 },
                                        { order: 3, activated: false, reps: 0 },
                                        { order: 4, activated: false, reps: 0 },
                                        { order: 5, activated: false, reps: 0 },
                                    ],
                                    active: false,
                                },
                                {
                                    id: "crunches",
                                    total: 0,
                                    sets: [
                                        { order: 1, activated: false, reps: 0 },
                                        { order: 2, activated: false, reps: 0 },
                                        { order: 3, activated: false, reps: 0 },
                                        { order: 4, activated: false, reps: 0 },
                                        { order: 5, activated: false, reps: 0 },
                                    ],
                                    active: false,
                                },
                            ],
                        },
                    ],
                },
            })
                .save()
                .then((user) => res.status(201).json(user))
                .catch((error) => res.status(501).json({ error }));
        }
    })
        .catch((error) => res.json({ error }));
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    return yield user_model_1.default
        .findOne({ email })
        .then((candidate) => candidate
        ? candidate.password === password
            ? res.status(201).json(candidate)
            : res.status(404).json({ message: "Password incorrect" })
        : res.status(404).json({ message: "User not found" }))
        .catch((error) => res.status(500).json({ error }));
});
exports.loginUser = loginUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    return yield user_model_1.default
        .findByIdAndDelete(userId)
        .then((candidate) => candidate
        ? res.status(201).json({ message: "User has been deleted" })
        : res.status(404).json({ message: "User not found" }))
        .catch((error) => res.status(500).json({ error }));
});
exports.deleteUser = deleteUser;
const addTrainToUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newTrain } = req.body;
    try {
        const candidate = yield user_model_1.default.findOne({ email });
        if (candidate) {
            yield user_model_1.default.updateOne({ email }, { $push: { "gym.trainings": newTrain } });
            res.status(200).json({
                message: "Train has been added",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurs",
        });
    }
});
exports.addTrainToUser = addTrainToUser;
