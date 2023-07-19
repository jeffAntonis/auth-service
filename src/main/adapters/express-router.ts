import { Controller } from '@/application/controllers'
import { logger } from '@/main/config/logger'

import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  logger.info(`${req.method} - ${req.url}`)
  const { statusCode, data } = await controller.handle({ ...req.query, ...req.body, ...req.locals })
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)

  json?.error != null
    ? logger.error(`END - ${statusCode} - ${JSON.stringify(json)}`)
    : logger.info(`END - ${statusCode} - ${JSON.stringify(json)}`)
}
