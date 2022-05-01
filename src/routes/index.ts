import { Router } from 'express'
import tokenValidator from '../middlewares/tokenValidator'
import authRoutes from './authRoutes'
import infoMarcoRoutes from './infomarcoRoutes'
import taskRoutes from './taskRoutes'


const apiRoutes = Router()

apiRoutes.use('/', infoMarcoRoutes)
apiRoutes.use('/auth', authRoutes)
apiRoutes.use('/tasks', tokenValidator(), taskRoutes)

export default apiRoutes