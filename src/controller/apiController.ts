import { Request, Response } from 'express'

export default {
    self: (_: Request, res: Response) => {
        try {
            res.sendStatus(200)
        } catch (err) {
            if (err) {
                res.sendStatus(500)
            }
        }
    }
}
