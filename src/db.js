import config from 'config'
import Sequelize from 'sequelize'
import { createLogger } from './modules/logger'


const log = createLogger('db')
const uri = config.get('db.sqlite.uri')
const db = new Sequelize(uri)

export async function start () {
  await db.authenticate()

  log.info('Connected')
  log.info(`URI: ${uri}`)

  return db
}

export default db
