// src/types/express.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string // Adjust according to the actual type of the id
                email: string
                name: string
            }
        }
    }
}
