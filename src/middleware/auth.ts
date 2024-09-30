// middleware/auth.js
import { NextFunction, Request, Response } from 'express'
import jwtUtils from '../service/jwtService'
import asyncHandler from 'express-async-handler'

const authenticate = asyncHandler((req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json({ error: 'No token provided' })
        return // Sends response and exits
    }

    try {
        const decoded = jwtUtils.verifyToken(token) // Verify and decode the token
        req.user = decoded // Attach decoded info to the request object
        next() // Proceed to the next middleware or route handler
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(401).json({ error: 'Token is invalid or expired' }) // Sends response and exits
    }
})

export default authenticate
