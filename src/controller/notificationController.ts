/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express'
import admin from '../config/firebaseConfig'
import expressAsyncHandler from 'express-async-handler'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import { Register } from '../model/UserM'
import httpError from '../util/httpError'

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
        httpResponse(req, res, 200, responseMessage.NOTIFICATION, response)
    }),
    sendContactNotification: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id, message } = req.body

        if (!id || !message) {
            return httpError(next, 'Seller phone and message are required!', req, 404)
        }

        // Find seller and get all device tokens
        const seller = await Register.findOne({ _id: id })

        if (!seller) {
            return httpError(next, 'Seller not found!', req, 404)
        }

        const tokens = seller.deviceTokens
        // Send notifications to all tokens
        const promises = tokens.map((token) =>
            admin.messaging().send({
                token: token,
                notification: {
                    title: 'Farmer Contact Request',
                    body: `Farmer ID: ${id} wants to contact you.`
                }
            })
        )
        await Promise.all(promises)
        httpResponse(req, res, 200, responseMessage.NOTIFICATION)
    })
}
