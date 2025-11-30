import dotenv from "dotenv";

dotenv.config();

export const envVars = {
    PORT: process.env.PORT || '5000',
    DB_URL: process.env.DB_URL || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production'
}