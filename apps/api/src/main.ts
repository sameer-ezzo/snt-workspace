import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as compression from 'compression';
import * as fs from 'fs';
import * as path from 'path';
import * as spdy from 'spdy';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AccessTokenHeaderInterceptor } from './app/interceptors/headers.response';
const cors = require('cors');
const bodyParser = require('body-parser');


const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false
  }

  // use compression filter function
  return compression.filter(req, res)
}

async function bootstrap() {

  const expressApp = express();
  const keysBase = path.join(__dirname)
  console.log('PATH: ', path.join(__dirname));

  expressApp.use(cors())

  const spdyOpts: spdy.ServerOptions = {

    key: fs.readFileSync(path.join(keysBase, 'keys/snt-private.key')),
    cert: fs.readFileSync(path.join(keysBase, 'keys/snt-certificate.cert')),
  };

  const server = spdy.createServer(spdyOpts, expressApp);

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const port = process.env.PORT || 3456;

  await app.init();
  await app.use(compression({ filter: shouldCompress }));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.enableCors();
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
  });


  try {
    await server.listen(port);
    Logger.log(
      `🚀 Application is running on: https://localhost:${port}`
    );
  } catch (error) {
    Logger.error(error)
  }
}

bootstrap();
