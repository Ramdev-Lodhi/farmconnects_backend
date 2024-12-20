import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import expressAsyncHandler from 'express-async-handler'
import { Rent } from '../model/RentM'
import httpError from '../util/httpError'
import { Register } from '../model/UserM'
import logger from '../util/logger'

interface User {
    id: string
    loginid: string
}
interface ServiceRequest {
    name: string
    mobile: string
    location: string
    requestedFrom: Date
    requestedTo: Date
}
export default {
    InsertRentItem: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const RentData = new Rent(req.body)
        const data = req.user as User | undefined
        logger.info('TokenData', {
            meta: {
                id: data ? data.id : '',
                Rentdata: RentData
            }
        })

        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        RentData.userId = userData ? userData._id : null
        RentData.image = req.file ? req.file.path : ''
        const savedata = await RentData.save()

        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    }),
    getRentAllservices: expressAsyncHandler(async (req: Request, res: Response) => {
        const rentData = await Rent.find()
        const data = {
            RentData: rentData
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),
    getRentItem: expressAsyncHandler(async (req: Request, res: Response) => {
        const { address } = new Rent(req.body)
        if (!address || !address.pincode) {
            return httpResponse(req, res, 400, 'Pincode is required.')
        }

        const { pincode } = address
        const rentData = await Rent.find({ 'address.pincode': pincode })
        const data = {
            RentData: rentData
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),
    getRentItemByUserID: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const Tokendata = req.user as User | undefined
        if (!Tokendata) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const rentData = await Rent.find({ userId: Tokendata.id })
        const data = {
            RentData: rentData
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),
    UpdateserviceRequests: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const data = req.user as User | undefined
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        const requestedBy = userData ? userData._id : null

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { serviceRequests } = req.body
        const serviceRequest = serviceRequests as ServiceRequest

        logger.info('serviceRequests', {
            meta: {
                serviceRequest
            }
        })
        const rentInstance = await Rent.findById(id)
        if (!rentInstance) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        rentInstance.serviceRequests.push({
            requestedBy: requestedBy,
            name: serviceRequest.name || userData?.name,
            mobile: serviceRequest.mobile || userData?.mobile,
            location: serviceRequest.location || userData?.state,
            requestedFrom: serviceRequest.requestedFrom ? new Date(serviceRequest.requestedFrom) : new Date(),
            requestedTo: serviceRequest.requestedTo ? new Date(serviceRequest.requestedTo) : new Date()
        })

        // Save the updated document
        const savedData = await rentInstance.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedData)
    }),
    UpdateServiceRequestStatus: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id, requestId } = req.params
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { requestStatus } = req.body
        const Tokendata = req.user as User | undefined
        if (!Tokendata) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const rentInstance = await Rent.findOne({ _id: id })
        if (!rentInstance) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const serviceRequest = rentInstance.serviceRequests.find((request) => request._id.toString() === requestId)
        if (!serviceRequest) {
            return httpError(next, 'Service request not found', req, 404)
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        serviceRequest.requestStatus = requestStatus
        await rentInstance.save()

        httpResponse(req, res, 200, 'Service request status updated successfully', {
            rentId: rentInstance._id,
            serviceRequest
        })
    })
}
