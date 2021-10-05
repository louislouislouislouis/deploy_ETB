import express from "express";
import { NotConnectedError } from "../commonImpl/error/customError/NotConnectedError";
import {logConnection} from "../commonImpl/log/log";

/**
 *
 * @param req the request object
 * @returns if we are connected
 */
function isConnected(req : express.Request) : boolean {
    return true;
}



/**
 * define the middleware of connection used by express. It send an error if we arent connected, call next if we are
 * @param req
 * @param res
 * @param next
 */
export function connection(req : express.Request, res : express.Response, next : express.NextFunction) : void {
    // test si on est connecter, si oui on passe a la prochaine, sinon on renvois la req
    if(isConnected(req)){
        next();
    }else{
        next(new NotConnectedError(logConnection));
    }
}