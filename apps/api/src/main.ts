import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import * as compression from 'compression'
const cors = require('cors')
const bodyParser = require('body-parser')
import helmet from 'helmet';


const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false
  }

  // use compression filter function
  return compression.filter(req, res)
}

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  // })
  app.use(cors())
  app.use(helmet())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    }
    else {
      next()
    }
  })

  await app.use(compression({ filter: shouldCompress }))

  try {
    const port = process.env.PORT || 3456
    await app.listen(port);
    Logger.log(`🚀 Application is running on: https://localhost:${port}`)
  } catch (error) {
    Logger.error(error)
  }
}

bootstrap()
