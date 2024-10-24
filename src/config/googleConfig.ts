import dotenv from 'dotenv'

dotenv.config()

export const GOOGLE_CLIENT_ID = process.env.CLIENT_ID || ''
export const PORT = process.env.PORT || 5000
