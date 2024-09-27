import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import User from '../model/user.Model'
import logger from '../util/logger'

export default {
    getUsers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allusers = await User.find()
            httpResponse(req, res, 200, responseMessage.USERS_FETCHED, allusers)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    getUserbyID: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const userData = await User.findById({ _id: id })
            httpResponse(req, res, 200, responseMessage.USERS_FETCHED, userData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    insertUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = new User(req.body)
            const { email } = userData
            const userExist = await User.findOne({ email })
            if (userExist) {
                return httpResponse(req, res, 200, responseMessage.USER_EXIST, email)
            }
            const saveUser = await userData.save()
            httpResponse(req, res, 200, responseMessage.USER_CREATED, saveUser)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const userExist = await User.findOne({ _id: id })
            if (!userExist) {
                return httpError(next, responseMessage.NOT_FOUND, req, 404)
            }
            const userData = await User.findByIdAndUpdate(id, req.body, { new: true })
            httpResponse(req, res, 200, responseMessage.USER_UPDATED, userData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },

    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            logger.info(id)
            const userExist = await User.findOne({ _id: id })
            if (!userExist) {
                return httpError(next, responseMessage.NOT_FOUND, req, 404)
            }
            await User.findByIdAndDelete(id)
            httpResponse(req, res, 200, responseMessage.USER_DELETED)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
