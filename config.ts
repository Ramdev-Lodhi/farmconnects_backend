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
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    DATABASE_URL: process.env.DATABASE_URL
}
