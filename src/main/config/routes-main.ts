import { Router, Express } from 'express'

export const setupRoutesMain = (app: Express): void => {
  const router = Router()

  router.get('/', (req, res) => res.json({
    message: 'Mol - Auth Service',
    version: '1.0.0'
  }))

  router.get('/healthz', (req, res) => res.send('ok'))
  app.use(router)
}
