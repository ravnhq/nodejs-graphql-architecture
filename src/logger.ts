import pino from 'pino'
const getLoggerForEnvironment = () => {
  return pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: true,
        levelFirst: true,
      },
    },
  })
}

export default getLoggerForEnvironment()
