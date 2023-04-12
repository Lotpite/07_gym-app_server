import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userModel, { IUser } from "../models/user.model";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  return await userModel
    .findOne({ email })
    .then((candidate) => {
      if (candidate) {
        res.json({ message: `User ${email} already exists` });
      } else {
        new userModel({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          gym: {
            trainings: [
              {
                id: "1673560800000",
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
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log(email, password);
  return await userModel
    .findOne({ email })
    .then((candidate) =>
      candidate
        ? candidate.password === password
          ? res.status(201).json(candidate)
          : res.status(404).json({ message: "Password incorrect" })
        : res.status(404).json({ message: "User not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  return await userModel
    .findByIdAndDelete(userId)
    .then((candidate) =>
      candidate
        ? res.status(201).json({ message: "User has been deleted" })
        : res.status(404).json({ message: "User not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
