import { config } from "dotenv";

config();

if (!process.env.BOT_SERVER) throw new Error("BOT_SERVER is not defined");
export const BOT_SERVER = process.env.BOT_SERVER;

if (!process.env.SAQ_SERVER) throw new Error("SAQ_SERVER is not defined");
export const SAQ_SERVER = process.env.SAQ_SERVER;
