import { Router } from 'express'
import tokenValidator from '../middlewares/tokenValidator'
import authRoutes from './authRoutes'
import infoRoutes from './infoRoutes'
import taskRoutes from './taskRoutes'


const apiRoutes = Router()

apiRoutes.use('/', infoRoutes)
apiRoutes.use('/auth', authRoutes)
apiRoutes.use('/tasks', tokenValidator(), taskRoutes)

export default apiRoutes