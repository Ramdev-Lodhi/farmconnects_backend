import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import User from '../model/user.Model'
import logger from '../util/logger'
import expressAsyncHandler from 'express-async-handler'

export default {
    getUsers: expressAsyncHandler(async (req: Request, res: Response) => {
        const allusers = await User.find()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, allusers)
    }),
    getUserbyID: expressAsyncHandler(async (req: Request, res: Response) => {
        const id = req.params.id
        const userData = await User.findById({ _id: id })
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, userData)
    }),
    insertUser: expressAsyncHandler(async (req: Request, res: Response) => {
        const userData = new User(req.body)
        const { email } = userData
        const userExist = await User.findOne({ email })
        if (userExist) {
            return httpResponse(req, res, 200, responseMessage.USER_EXIST, email)
        }
        const saveUser = await userData.save()
        httpResponse(req, res, 200, responseMessage.USER_CREATED, saveUser)
    }),
    updateUser: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const updateData = req.body as { name?: string; city?: string; mobile?: string; email?: string }
        const userData = await User.findByIdAndUpdate(id, updateData, { new: true })
        httpResponse(req, res, 200, responseMessage.USER_UPDATED, userData)
    }),

    deleteUser: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        logger.info(id)
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        await User.findByIdAndDelete(id)
        httpResponse(req, res, 200, responseMessage.USER_DELETED)
    })
}
