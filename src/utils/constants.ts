import { config } from 'dotenv-safe';

config();

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const IS_PROD = NODE_ENV === 'production';
