import config from './config/config'
import app from './app'
import logger from './util/logger'

const server = app.listen(config.PORT)
;(() => {
    try {
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
