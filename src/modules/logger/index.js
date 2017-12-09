import winston from 'winston'
import config from 'config'

export function createLogger (label, options = {}) {
  const logger = new winston.Logger({
    level: config.get('logs.level'),
    transports: [
      new winston.transports.Console({ label, colorize: config.get('logs.colorize') }),
    ],
  })

  if (options.streamify) {
    logger.stream = {
      write (message) {
        logger.debug(message)
      },
    }
  }

  return logger
}

export default new winston.Logger({
  level: config.get('logs.level'),
  transports: [
    new winston.transports.Console({ colorize: true }),
  ],
})
