 
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
 
import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { GOOGLE_CLIENT_ID } from '../config/googleConfig'

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

export const googleLogin = async (req: Request, res: Response) => {
    const { token } = req.body

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload()

    // Extract user information
    // const userId = payload?.sub
    const email = payload?.email
    const name = payload?.name
    const picture = payload?.picture

    // Respond with user info (you may want to save this to a database)
    return res.status(200).json({
        status: true,
        data: {
            token: token,
            email,
            name,
            image: picture
        }
    })
}
