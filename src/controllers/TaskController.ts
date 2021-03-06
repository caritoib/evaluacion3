import type { Request, Response } from 'express'
import type { CreateTaskDTO, UpdateTaskDTO} from '../models/dto/TaskDTO'
import { UserTokenPayload } from '../models/dto/UserDTO'
import TaskRepository from '../models/repositories/TaskRepository'
import { createTaskSchema, updateTaskSchema } from '../models/validators/taskSchemas'

export default class TaskController {
  public readonly getAll = async (req: Request, res: Response) => {
    try {
      const user = req.user as UserTokenPayload
      const repository = new TaskRepository(user.sub)
      const tasks = await repository.findAll()
      res.json(tasks)
    } catch(error) {
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    const task = await repository.findById(parseInt(id))

    if (!task) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    if (task.userId !== user.sub) {
      res.status(403).json({ message: 'You dont have permissions for reading data of Task' })
      return
    }

    res.json(task)
  }

  public readonly create = async (req: Request, res: Response) => {
    const task: CreateTaskDTO = req.body
    try {
      await createTaskSchema.validateAsync(task)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    try {
      const newTask = await repository.create(task)
      res.status(201).json(newTask)
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(409).json({ message: 'Task already exists' })
        return
      }
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  } 

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const task: UpdateTaskDTO = req.body

    try {
      await updateTaskSchema.validateAsync(task)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    
    try {
      const taskFromDb = await repository.findById(parseInt(id))

      if (!taskFromDb) {
        res.status(404).json({ message: 'Task not found' })
        return
      }

      if (taskFromDb.userId !== user.sub) {
        res.status(403).json({ message: 'You dont have permissions for updating data of Task' })
        return
      }

      await repository.update(parseInt(id), task)
      res.sendStatus(204)
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(409).json({ message: 'Task already exists' })
        return
      }
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)

    try {
      const taskFromDb = await repository.findById(parseInt(id))

      if (!taskFromDb) {
        res.status(404).json({ message: 'Task not found' })
        return
      }

      if (taskFromDb.userId !== user.sub) {
        res.status(403).json({ message: 'You dont have permissions for deleting Task' })
        return
      }

      await repository.delete(parseInt(id))

      res.sendStatus(204)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
}