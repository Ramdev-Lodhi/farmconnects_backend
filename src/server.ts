import config from './config/config'
import app from './app'

const server = app.listen(config.PORT)
;(() => {
    try {
        // eslint-disable-next-line no-console
        console.info('Application Started', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Application Error', { meta: err })
        server.close((error) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Application Error', { meta: err })
            }

            process.exit(1)
        })
    }
})()
