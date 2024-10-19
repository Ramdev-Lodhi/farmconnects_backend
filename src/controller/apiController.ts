import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import { Register } from '../model/UserM'
import expressAsyncHandler from 'express-async-handler'

export default {
    getUsers: expressAsyncHandler(async (req: Request, res: Response) => {
        const allusers = await Register.find()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, allusers)
    }),
    getUserbyID: expressAsyncHandler(async (req: Request, res: Response) => {
        const id = req.params.id
        const userData = await Register.findById({ _id: id })
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, userData)
    }),
    insertUser: expressAsyncHandler(async (req: Request, res: Response) => {
        const userData = new Register(req.body)
        const { email } = userData
        const userExist = await Register.findOne({ email })
        if (userExist) {
            return httpResponse(req, res, 200, responseMessage.USER_EXIST, email)
        }
        const saveUser = await userData.save()
        httpResponse(req, res, 200, responseMessage.USER_CREATED, saveUser)
    }),

    updateUser: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        const userExist = await Register.findOne({ _id: id })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const updateData = new Register(req.body)
        const userData = await Register.findByIdAndUpdate(id, updateData, { new: true })
        httpResponse(req, res, 200, responseMessage.USER_UPDATED, userData)
    }),

    deleteUser: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        const userExist = await Register.findOne({ _id: id })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        await Register.findByIdAndDelete(id)
        httpResponse(req, res, 200, responseMessage.USER_DELETED)
    }),

    updateImage: expressAsyncHandler(async (req: Request, res: Response) => {
        const id = req.params.id
        const image = req.file ? req.file.path : `https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_.jpg`
        const updatedUser = await Register.findByIdAndUpdate(id, { image }, { new: true })
        if (!updatedUser) {
            return httpResponse(req, res, 404, 'User not found')
        }

        httpResponse(req, res, 200, 'Image Upload Successful', updatedUser)
    })
}
