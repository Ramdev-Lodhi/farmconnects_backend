import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import expressAsyncHandler from 'express-async-handler'
import { Banner } from '../model/Banner'
import { Brand } from '../model/BrandM'
import { Tractor } from '../model/TractorM'
import httpError from '../util/httpError'
import { ImplementBrand } from '../model/ImplementBrandM'
import { Implements } from '../model/ImplementsM'

export default {
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

    insertTractors: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const tractorData = new Tractor(req.body)
        if (!tractorData) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        tractorData.tractor_image = req.file ? req.file.path : ''

        const savedata = await tractorData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    }),
    insertImplementBrand: expressAsyncHandler(async (req: Request, res: Response) => {
        const { name } = new ImplementBrand(req.body)

        const brandPath = req.file ? req.file.path : ''
        // Assuming you're creating a new Register entry with the brand image
        const newData = new ImplementBrand({ logo: brandPath, name: name })
        // Save the data to the database
        const saveUser = await newData.save()
        httpResponse(req, res, 200, 'brand Upload Successful', saveUser)
    }),
    insertImplements: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const implementData = new Implements(req.body)
        if (!implementData) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        implementData.implement_image = req.file ? req.file.path : ''

        const savedata = await implementData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    })
}
