import { Router } from 'express'
import InfoMarcoController from '../controllers/InfoController'

const infoRoutes = Router()
const controller = new InfoMarcoController()

infoRoutes.get('/info', controller.info)
infoRoutes.get('/ping', controller.ping)

export default infoRoutes