import express from "express";
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import config from 'config';

import {EnvValidator, checkObject} from './API/inputChecker'
import {logRouteur, logStartup} from "./model/commonImpl/log/log"
import * as routesApi from "./Routes";
import {ErrorMiddleware} from './model/commonImpl/error/ErrorMiddleware'
import {Database} from './model/commonImpl/Database'
import { CustomError } from "./model/commonImpl/error/CustomError";
import { ItemImpl } from "./model/itemImpl/ItemImpl";
import { ServerHumainReadableDescriptor } from "./API/descriptor/APIDescriptor";

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// define the parametre of the app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// implement the routes of the API
routesApi.register( app );

// use the result of the compilation of react in the folder build and public
app.use('/', express.static(path.join(process.env.PROJECT_ROOT, "build")));

// handle 404 not found
app.get('/*', function (req, res) {

  res.sendFile(path.join(process.env.PROJECT_ROOT, 'build', 'index.html'));
});

// handle error (middleware)
app.use(ErrorMiddleware);

// start the express server
app.listen( port, async () => {
  // create descriptor
  /*const filePath : string = path.join(process.env.PROJECT_ROOT, config.get("descriptor.file"))
  fs.writeFile(filePath, ServerHumainReadableDescriptor, function (err) {
    if (err) return logStartup.error("Can't build humain readable api descriptor", err);
    logStartup.debug(ServerHumainReadableDescriptor + ' > ' + filePath);
  });*/

  // validate environnement
  try{
    checkObject(process.env, EnvValidator);
  }catch(e){
    logStartup.fatal("can't parse env variable : ", e);
  }

  // mount error
  const canMap = CustomError.mapperMount()
  if(!canMap) logStartup.warn("Can't map error")

  // database administration
  try{
    await Database.connect();
    await ItemImpl.createDb();
    logStartup.info("conected to : " + process.env.MONGODB_URL);
  }catch(e){
    logStartup.fatal("can't connect to database : " + process.env.MONGODB_URL, e);
  }

  logStartup.info( `server started at http://localhost:${ port }` );
} );