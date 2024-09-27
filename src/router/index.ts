import { Router } from 'express'
import loginRoute from './loginRouter'
import userRoute from './apiRouter'
import healthRoute from './healthRouter'
const router = Router()
const defaultRoutes = [
    {
        path: '/health',
        route: healthRoute
    },
    {
        path: '/',
        route: loginRoute
    },
    {
        path: '/user',
        route: userRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router
