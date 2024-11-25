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
    requestStatus?: 'Pending' | 'Approved' | 'Rejected'
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

        // const { serviceRequests } = new Rent(req.body)

        const serviceRequests = req.body as ServiceRequest
        logger.info('serviceRequests', {
            meta: {
                id: data ? data.id : '',
                serviceRequests: serviceRequests
            }
        })
        const rentInstance = await Rent.findById(id)
        if (!rentInstance) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        logger.info('rentInstance', {
            meta: {
                id: data ? data.id : '',
                rentInstance: rentInstance
            }
        })
        // rentInstance.serviceRequests.push(serviceRequests)

        rentInstance.serviceRequests.push({
            requestedBy: requestedBy,
            name: serviceRequests.name,
            mobile: serviceRequests.mobile,
            location: serviceRequests.location,
            requestStatus: serviceRequests.requestStatus || 'Pending',
            requestedFrom: serviceRequests.requestedFrom.toISOString().split('T')[0],
            requestedTo: serviceRequests.requestedTo.toISOString().split('T')[0]
        })

        logger.info('rentInstance2', {
            meta: {
                id: data ? data.id : '',
                rentInstance: rentInstance
            }
        })
        // Save the updated document
        const savedData = await rentInstance.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedData)
    })
    // UpdateserviceRequests: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //     const { id } = req.params
    //     const data = req.user as User | undefined
    //     if (!data) {
    //         return httpError(next, responseMessage.NOT_FOUND, req, 404)
    //     }
    //     const userData = await Register.findById({ _id: data.id })
    //     // Destructure serviceRequests from the body of the request
    //     const { serviceRequests } = req.body
    //     const userId = userData ? userData._id : null
    //     // Fetch Rent instance by ID
    //     const rentInstance = await Rent.findById(id)
    //     if (!rentInstance) {
    //         return httpError(next, responseMessage.NOT_FOUND, req, 404)
    //     }

    //     // Make sure serviceRequests is an array and iterate through it to push each request
    //     if (Array.isArray(serviceRequests)) {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         serviceRequests.forEach((request: any) => {
    //             // Assuming `request` has the structure of serviceRequest as per your model
    //             rentInstance.serviceRequests.push({
    //                 requestedBy: userId,
    //                 name: request.name,
    //                 mobile: request.mobile,
    //                 location: request.location,
    //                 requestStatus: request.requestStatus || 'Pending',
    //                 // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //                 requestedFrom: new Date(request.requestedFrom), // Ensure valid Date
    //                 // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //                 requestedTo: new Date(request.requestedTo) // Ensure valid Date
    //             })
    //         })
    //     } else {
    //         return httpError(next, responseMessage.INVALID_DATA, req, 400)
    //     }

    //     // Save the updated document
    //     const savedData = await rentInstance.save()
    //     httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedData)
    // })
}
