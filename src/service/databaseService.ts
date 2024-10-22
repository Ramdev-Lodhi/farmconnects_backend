import mongoose from 'mongoose'
import config from '../config/config'
// import logger from '../util/logger'

export default {
    connect: async () => {
        try {
            await mongoose.connect(config.DATABASE_URL as string)
            // logger.info('Databse connection Atlas', {
            //     meta: {
            //         Database: `Connected to MongoDB Atlas successfully ${config.DATABASE_URL}`
            //     }
            // })
            return mongoose.connection
        } catch (err) {
            throw err
        }
    }
}
