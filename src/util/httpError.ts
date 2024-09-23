import { NextFunction, Request } from 'express'
import errorObject from './errorObject'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatuscCode: number = 500): void => {
    const errorObj = errorObject(err, req, errorStatuscCode)
    return nextFunc(errorObj)
}
