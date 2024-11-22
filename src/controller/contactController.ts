import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import httpError from '../util/httpError'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import { SellContact } from '../model/rent_contact_enquiryM'
import { Register } from '../model/UserM'
interface User {
    id: string
    loginid: string
}
export default {
    insertSellContact: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const sellTractorData = new SellContact(req.body)
        const data = req.user as User | undefined
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        if (sellTractorData.farmerInfo && Array.isArray(sellTractorData.farmerInfo)) {
            sellTractorData.farmerInfo.forEach((farmer) => {
                farmer.userId = userData ? userData._id : null
            })
        }
        const savedata = await sellTractorData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    })
}
