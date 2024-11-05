import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import { Register, Login } from '../model/UserM'
import expressAsyncHandler from 'express-async-handler'
import logger from '../util/logger'
import cloudinary from '../config/cloudinaryConfig'
import userService from '../service/userService'
// import logger from '../util/logger'
interface User {
    id: string
    loginid: string
}

export default {
    getUsers: expressAsyncHandler(async (req: Request, res: Response) => {
        const allusers = await Register.find()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, allusers)
    }),

    getUserbyID: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = req.user as User | undefined
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        const userData = await Register.findById({ _id: data.id })
        const userLoginData = await Login.findById({ _id: data.loginid })
        if (!userData) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        if (!userLoginData) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userdata = {
            id: userData._id.toString(),
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            image: userData.image,
            state: userData.state,
            district: userData.district,
            sub_district: userData.sub_district,
            village: userData.village,
            pincode: userData.pincode,
            password: userLoginData.password
        }

        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, userdata)
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
    change_password: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = req.user as User | undefined
        logger.info('Data', {
            meta: {
                data
            }
        })
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userExist = await Login.findOne({ _id: data.loginid })
        logger.info('Data', {
            meta: {
                userExist
            }
        })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        logger.info('Data', {
            meta: {
                userExist
            }
        })

        const { password } = new Login(req.body)
        const hashedpassword = await userService.registerService(password ?? '')
        // logger.info('validUpdateData', { meta: { updateData } })
        const loginpassword = {
            password: hashedpassword
        }
        const userData = await Login.findByIdAndUpdate(data.loginid, loginpassword, { new: true })
        if (!userData) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        logger.info('userData', {
            meta: {
                userData
            }
        })
        httpResponse(req, res, 200, responseMessage.USER_UPDATED, userData)
    }),

    updateUser: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = req.user as User | undefined

        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userExist = await Register.findOne({ _id: data.id })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        // const updateData = new Register(req.body)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
        const { _id, ...updateData }: { _id?: string; [key: string]: unknown } = req.body

        const userData = await Register.findByIdAndUpdate(data.id, updateData, { new: true })
        if (!userData) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userLoginExist = await Login.findOne({ _id: data.loginid })
        if (!userLoginExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const { password } = new Login(req.body)
        const hashedpassword = await userService.registerService(password ?? '')

        const loginpassword = {
            password: hashedpassword
        }
        await Login.findByIdAndUpdate(data.loginid, loginpassword, { new: true })
        httpResponse(req, res, 200, responseMessage.USER_UPDATED, userData)
    }),
    updateImage: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = req.user as User | undefined

        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        const currentUser = await Register.findById(data.id)
        if (!currentUser) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        const oldImageUrl = currentUser.image

        if (oldImageUrl) {
            const folderName = 'farmconnects/users'
            const urlParts = oldImageUrl.split('/')

            logger.info('urlpart', {
                meta: {
                    urlParts
                }
            })
            if (urlParts[0] == 'res.cloudinary.com') {
                if (urlParts.length > 0) {
                    const lastSegment = urlParts.pop()
                    if (lastSegment) {
                        const oldPublicId = lastSegment.split('.')[0]
                        const fullPublicId = `${folderName}/${oldPublicId}`

                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const deletionResponse = await cloudinary.uploader.destroy(fullPublicId)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        if (deletionResponse.result !== 'ok') {
                            return httpError(next, responseMessage.NOT_FOUND, req, 404)
                        }
                    } else {
                        return httpError(next, responseMessage.NOT_FOUND, req, 404)
                    }
                } else {
                    return httpError(next, responseMessage.NOT_FOUND, req, 404)
                }
            }
        }

        const image = req.file ? req.file.path : `https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_kzxegi.jpg`
        const updatedUser = await Register.findByIdAndUpdate(data.id, { image }, { new: true })
        if (!updatedUser) {
            return httpResponse(req, res, 404, 'User not found')
        }
        httpResponse(req, res, 200, 'Image Upload Successful', updatedUser)
    }),

    deleteUser: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        const userExist = await Register.findOne({ _id: id })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        await Register.findByIdAndDelete(id)
        httpResponse(req, res, 200, responseMessage.USER_DELETED)
    })
}
