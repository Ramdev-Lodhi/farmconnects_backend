import { Request, Response, NextFunction } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import expressAsyncHandler from 'express-async-handler'
import { Brand } from '../model/BrandM'
import { Tractor } from '../model/TractorM'
import httpError from '../util/httpError'
import { SellTractor } from '../model/SellTractorM'
import { Register } from '../model/UserM'
interface User {
    id: string
    loginid: string
}
export default {
    getBrand: expressAsyncHandler(async (req: Request, res: Response) => {
        const allBrand = await Brand.find()
        const data = {
            brands: allBrand
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),

    getModel: expressAsyncHandler(async (req: Request, res: Response) => {
        const { name } = new Brand(req.body)
        // logger.info('modeldata', {
        //     meta: {
        //         name
        //     }
        // })
        const model = await Tractor.find({ brand: name }, 'name engine.HP_category')

        const data = {
            modelname: model
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),
    insertselltractor: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const sellTractorData = new SellTractor(req.body)
        const data = req.user as User | undefined
        if (!sellTractorData) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        sellTractorData.image = req.file ? req.file.path : ''
        const userData = await Register.findById({ _id: data.id })
        sellTractorData.sellerId = userData ? userData._id : null
        const savedata = await sellTractorData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    }),
    getSelltractor: expressAsyncHandler(async (req: Request, res: Response) => {
        const totalCount = await SellTractor.countDocuments()

        // Use $sample to get all tractors in a random order
        const sellTractors = await SellTractor.aggregate([{ $sample: { size: totalCount } }])
        const data = {
            sellTractor: sellTractors
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    })
}
