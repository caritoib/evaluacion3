import { Router } from 'express'
import InfoMarcoController from '../controllers/InfoMarcoController'

const infomarcoRoutes = Router()
const controller = new InfoMarcoController()

infomarcoRoutes.get('/info', controller.info)
infomarcoRoutes.get('/marco', controller.marco)

export default infomarcoRoutes