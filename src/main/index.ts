import './config/module-alias'
import { env } from '@/main/config/env'
import { logger } from '@/main/config/logger'
import { PgConnection } from '@/infra/repos/postgres/helpers'

import 'reflect-metadata'

PgConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    console.log(process.env.TS_NODE_DEV)
    app.listen(env.port, () => logger.info(`Server running at http://host:${env.port}`))
  })
  .catch(error => logger.error(error))
