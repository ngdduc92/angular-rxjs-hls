import { Request, Response } from 'express-serve-static-core';
import * as path from 'path';
import * as moment from 'moment';

const express = require('express');
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

class Server {
  public app: any;
  private port = 9090;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    // Create expressjs application
    this.app = express();

    // Redirect all the other resquests
    this.app.get('*', (req: Request, res: Response) => {
      if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`dist/${req.url}`));
      } else {
        res.sendFile(path.resolve('dist/index.html'));
      }
    });
    
    this.app.listen(this.port, () => console.log(`Server is running at http://localhost:${this.port}`));

    this.app.on('error', (error: any) => {
      console.error(moment().format(), 'ERROR', error);
    });

    process.on('uncaughtException', (error: any) => {
      console.log(moment().format(), error);
    });
  }
}

const server = Server.bootstrap();
export default server.app;