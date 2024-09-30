// utils/jwt.js
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { user } from '../types/types'
// interface DecodedToken {
//     id: string
//     email: string
//     name: string
//     mobile: string
// }

const generateToken = (user: user) => {
    return jwt.sign(user, config.JWT_SECRET, { expiresIn: '24h' })
}

const verifyToken = (token: string): user => {
    return jwt.verify(token, config.JWT_SECRET) as user
}

export default { generateToken, verifyToken }
