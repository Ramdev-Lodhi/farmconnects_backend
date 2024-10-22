import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import { Register } from '../model/UserM'
import expressAsyncHandler from 'express-async-handler'
import { Banner } from '../model/Banner'
import { Brand } from '../model/BrandM'

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
        const image = req.file ? req.file.path : `https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_kzxegi.jpg`
        const updatedUser = await Register.findByIdAndUpdate(id, { image }, { new: true })
        if (!updatedUser) {
            return httpResponse(req, res, 404, 'User not found')
        }

        httpResponse(req, res, 200, 'Image Upload Successful', updatedUser)
    }),

    insertBanners: expressAsyncHandler(async (req: Request, res: Response) => {
        const bannerPath = req.file ? req.file.path : 'https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_kzxegi.jpg'
        // Assuming you're creating a new Register entry with the banner image
        const newData = new Banner({ banner: bannerPath })
        // Save the data to the database
        const saveUser = await newData.save()

        httpResponse(req, res, 200, 'Banner Upload Successful', saveUser)
    }),
    insertBrand: expressAsyncHandler(async (req: Request, res: Response) => {
        const { name } = new Brand(req.body)

        const brandPath = req.file ? req.file.path : ''
        // Assuming you're creating a new Register entry with the brand image
        const newData = new Brand({ logo: brandPath, name: name })
        // Save the data to the database
        const saveUser = await newData.save()
        httpResponse(req, res, 200, 'brand Upload Successful', saveUser)
    }),

    getHome: expressAsyncHandler(async (req: Request, res: Response) => {
        const allBanners = await Banner.find()
        const allBrand = await Brand.find()
        const data = {
            banners: allBanners,
            brands: allBrand
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    })
}
