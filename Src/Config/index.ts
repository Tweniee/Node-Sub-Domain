import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const DB_URI = process.env.MONGODB_URI as string;
const JWT_KEY = process.env.JWT_KEY as string;
const MAIN_PORT = process.env.MAIN_PORT as string;
const AUTH_EMAIL = process.env.AUTH_EMAIL as string;
const AUTH_PASS = process.env.AUTH_PASS as string;
export { DB_URI, JWT_KEY, MAIN_PORT, AUTH_EMAIL, AUTH_PASS };
