import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL || "";
const SERVER_PORT = process.env.SERVER_PORT || 4001;

export const config = {
  mongo: {
    url: DB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
