import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const DB_URI = process.env.MONGODB_URI as string;


export {
    DB_URI
}