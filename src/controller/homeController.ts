import { Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import expressAsyncHandler from 'express-async-handler'
import { Banner } from '../model/Banner'
import { Brand } from '../model/BrandM'
import { Tractor } from '../model/TractorM'

export default {
    getHome: expressAsyncHandler(async (req: Request, res: Response) => {
        const allBanners = await Banner.find()
        const allBrand = await Brand.find()
        // const Tractors = await Tractor.find()
        // const Tractors = await Tractor.find().sort({ $natural: -1 }).exec()
        const totalCount = await Tractor.countDocuments()

        // Use $sample to get all tractors in a random order
        const Tractors = await Tractor.aggregate([{ $sample: { size: totalCount } }])
        const data = {
            banners: allBanners,
            brands: allBrand,
            tractors: Tractors
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    })
}
