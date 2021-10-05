import * as express from "express";

import {connection as connectionMiddleware} from './model/userImpl/Middleware';

import {NotFoundError} from './model/commonImpl/error/customError/NotFoundError'
import {logRouteurApi} from "./model/commonImpl/log/log"

import {ServerDescriptor} from "./API/descriptor/APIDescriptor"
/*
    API :
*/
import {register as ItemRegister} from "./model/itemImpl/ItemRoutes"


/**
 * handle the routes of the API.
 * @param app
 */
export const register = ( app: express.Application ) => {
    // middleware de log
    app.post('/api/*', function(req, res, next){
        logRouteurApi.info("Route " + req.path + " appelé pour le Back.");
        next();
    });
    ////////////////////////////////////////////////////////////////////////////////
    // descriptor implementation
    ////////////////////////////////////////////////////////////////////////////////
    app.post('/api/descriptor', function(req, res, next){
        if(process.env.NODE_ENV === "development"){
            res.send(ServerDescriptor);
        }else{
            next();
        }
    });
    ////////////////////////////////////////////////////////////////////////////////
    // item implementation
    ////////////////////////////////////////////////////////////////////////////////

    ItemRegister(app);

    ////////////////////////////////////////////////////////////////////////////////
    // user connection
    ////////////////////////////////////////////////////////////////////////////////

    /**
     * use the middleware (todo : a tester)
     */
    app.post('/api/user/*', connectionMiddleware);

    ////////////////////////////////////////////////////////////////////////////////

    /**
     * routes unimplemented
     */
    app.post('/api/*', function (req, res, next) {
         next(new NotFoundError("NotFound.route", logRouteurApi, req.path));
    });
}
