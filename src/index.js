import Promise from 'bluebird'
import path from 'path'
import fs from 'fs'
import log from './modules/logger'

import { start as startDatabase } from './db'
import { start as startServer } from './server'

async function getPackageInfo () {
  try {
    const packageFilePath = path.join(__dirname, '../package.json')
    const packageFileContent = await Promise.fromCallback(cb => fs.readFile(packageFilePath, 'utf-8', cb))
    const packageFileParsed = JSON.parse(packageFileContent)

    return packageFileParsed
  } catch (err) {
    if (err.code === 'ENOENT') {
      log.error(`Can't find package.json file on path ${err.path}`)
    } else {
      log.error('Can\'t read package.json file')
    }

    return {}
  }
}

async function init () {
  const application = await getPackageInfo()

  log.info(`Starting ${application.name} application, version ${application.version}`)

  await startDatabase()
  await startServer()
}

init().catch(err => {
  log.error('Error starting application', err)
  process.exit()
})
