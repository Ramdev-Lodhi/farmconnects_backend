/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from 'express'
import admin from '../config/firebaseConfig'
import expressAsyncHandler from 'express-async-handler'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'

export default {
    sendNotification: expressAsyncHandler(async (req: Request, res: Response) => {
        const { token, title, body } = req.body
        if (!token || !title || !body) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields: token, title, or body'
            })
            return
        }

        const message = {
            notification: {
                title,
                body
            },
            token
        }
        const response = await admin.messaging().send(message)
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, response)
    })
}
