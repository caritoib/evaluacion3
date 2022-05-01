import { Router } from 'express'
import TaskController from '../controllers/TaskController'

const taskRoutes = Router()
const controlleroftasks = new TaskController()

taskRoutes.get('/', controlleroftasks.getAll)
taskRoutes.get('/:id', controlleroftasks.getById)
taskRoutes.post('/', controlleroftasks.create)
taskRoutes.put('/:id', controlleroftasks.update)
taskRoutes.delete('/:id', controlleroftasks.delete)

export default taskRoutes