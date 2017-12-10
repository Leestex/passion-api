import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import config from 'config'
import bodyParser from 'body-parser'
import cors from 'cors'

import router from './router'
import { createLogger } from './modules/logger'

const log = createLogger('server', true)
const server = express()

// TODO: define cors policy
server.use(cors())
server.use(helmet())
server.use(morgan('tiny', { stream: log.stream }))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(router)

export function start () {
  return new Promise((resolve, reject) => {
    server.on('error', reject)
    server.listen(config.get('server.port'), function onServerStarted () {
      const { address, port } = this.address()

      log.info('Started')
      log.info(`host: ${address}`)
      log.info(`port: ${port}`)

      resolve()
    })
  })
}

export default server
