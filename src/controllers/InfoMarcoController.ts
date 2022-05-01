import { Request, Response } from 'express'

export default class InfoMarcoController {
  public readonly info = (_req: Request, res: Response) => {
    res.json({
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      description: process.env.npm_package_description
    })
  }

  public readonly marco = (_req: Request, res: Response) => {
    res.send('polo')
  }
}
