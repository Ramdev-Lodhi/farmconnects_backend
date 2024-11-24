/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express'
import admin from '../config/firebaseConfig'
import expressAsyncHandler from 'express-async-handler'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import { Register } from '../model/UserM'
import httpError from '../util/httpError'
interface FirebaseMessageResult {
    error?: {
        code: string
    }
}
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
        const invalidTokens: string[] = []
        try {
            await admin.messaging().send(message)
        } catch (error) {
            const firebaseError = error as FirebaseMessageResult
            if (
                firebaseError.error &&
                (firebaseError.error.code === 'messaging/registration-token-not-registered' ||
                    firebaseError.error.code === 'messaging/invalid-registration-token')
            ) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                invalidTokens.push(token)
            }
        }

        if (invalidTokens.length > 0) {
            await Register.updateMany({ deviceTokens: { $in: invalidTokens } }, { $pull: { deviceTokens: { $in: invalidTokens } } })
        }
        httpResponse(req, res, 200, responseMessage.NOTIFICATION, invalidTokens)
    }),
    // sendContactNotification: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //     const { id, message } = req.body

    //     if (!id || !message) {
    //         return httpError(next, 'Seller phone and message are required!', req, 404)
    //     }
    //     const seller = await Register.findOne({ _id: id })
    //     if (!seller) {
    //         return httpError(next, 'Seller not found!', req, 404)
    //     }
    //     const tokens = seller.deviceTokens
    //     // Send notifications to all tokens
    //     const promises = tokens.map((token) =>
    //         admin.messaging().send({
    //             token: token,
    //             notification: {
    //                 title: 'Farmer Contact Request',
    //                 body: `Farmer ID: ${id} wants to contact you.`
    //             }
    //         })
    //     )
    //     await Promise.all(promises)
    //     httpResponse(req, res, 200, responseMessage.NOTIFICATION)
    // })
    sendContactNotification: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id, title, message, image } = req.body

        if (!id || !message) {
            return httpError(next, 'Seller phone and message are required!', req, 400)
        }

        // Find the seller by ID
        const seller = await Register.findOne({ _id: id })
        if (!seller) {
            return httpError(next, 'Seller not found!', req, 404)
        }

        const tokens = seller.deviceTokens || []
        if (tokens.length === 0) {
            return httpError(next, 'No device tokens found for the seller!', req, 404)
        }

        const invalidTokens: string[] = []
        const notificationPromises = tokens.map(async (token) => {
            try {
                await admin.messaging().send({
                    token: token,
                    notification: {
                        title: `${title}`,
                        body: `${message}`,
                        imageUrl: `${image}`
                    }
                })
            } catch (error) {
                const firebaseError = error as FirebaseMessageResult
                if (
                    firebaseError.error &&
                    (firebaseError.error.code === 'messaging/registration-token-not-registered' ||
                        firebaseError.error.code === 'messaging/invalid-registration-token')
                ) {
                    invalidTokens.push(token)
                }
            }
        })

        await Promise.all(notificationPromises)
        if (invalidTokens.length > 0) {
            await Register.updateMany({ deviceTokens: { $in: invalidTokens } }, { $pull: { deviceTokens: { $in: invalidTokens } } })
        }

        httpResponse(req, res, 200, responseMessage.NOTIFICATION, { success: true, invalidTokens })
    })
}
