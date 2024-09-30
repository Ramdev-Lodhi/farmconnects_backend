// config/config.ts
import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing in the environment variables')
}

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
}
