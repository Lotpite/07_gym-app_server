import dotenv from "dotenv";

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_URL =
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@gymapp.7iu81mg.mongodb.net/gympit` ||
  "";
const SERVER_PORT = process.env.SERVER_PORT || 4444;

export const config = {
  mongo: {
    url: DB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
