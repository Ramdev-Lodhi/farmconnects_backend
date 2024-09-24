import config from './config/config'
import { initRateLimiter } from './config/rateLimiter'
import app from './app'
import logger from './util/logger'
import databaseService from './service/databaseService'

const server = app.listen(config.PORT)
// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
    try {
        //Database connection
        const connection = await databaseService.connect()
        logger.info('DATABASE CONNECTION', {
            meta: {
                CONNECTION_NAME: connection.name
            }
        })

        initRateLimiter(connection)
        logger.info(`RATE_LIMITER_INITIATED`)

        logger.info('Application Started', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error('Application Error', { meta: err })
        server.close((error) => {
            if (error) {
                logger.error('Application Error', { meta: err })
            }

            process.exit(1)
        })
    }
})()
