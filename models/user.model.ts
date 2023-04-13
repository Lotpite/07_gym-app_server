import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  trainings: ITraining[];
}

export interface ITraining {
  id: string;
  exercises: IExercise[];
}

export interface IExercise {
  id: string;
  total: number;
  sets: {
    order: number;
    reps: number;
  }[];
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gym: {
      trainings: [
        {
          id: { type: String },
          exercises: [
            {
              id: { type: String },
              total: { type: Number },
              sets: [
                {
                  id: { type: Number },
                  order: { type: Number },
                  reps: { type: Number },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
