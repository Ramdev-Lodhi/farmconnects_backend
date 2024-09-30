// utils/jwt.js
import jwt from 'jsonwebtoken'
import config from '../config/config'

interface DecodedToken {
    id: string // Adjust this type based on your user schema
    email: string
    name: string
}

const generateToken = (user: { id: string; email: string; name: string }) => {
    return jwt.sign(user, config.JWT_SECRET, { expiresIn: '24h' })
}

const verifyToken = (token: string): DecodedToken => {
    return jwt.verify(token, config.JWT_SECRET) as DecodedToken
}

export default { generateToken, verifyToken }
