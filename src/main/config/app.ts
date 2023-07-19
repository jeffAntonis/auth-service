import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'
import { setupRoutesMain } from '@/main/config/routes-main'
import setupSwagger from '@/main/config/swagger'
import express from 'express'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
setupRoutesMain(app)
export { app }
