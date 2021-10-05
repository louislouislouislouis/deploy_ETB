import express from "express";
import { CustomError } from "./CustomError";
import { UnhandledError } from "./customError/UnhandledError";

/**
 * Middleware to handle error. : '
 * Since Express runs all the middleware from the first to the last,
 * your error handlers should be at the end of your application stack.
 * If you pass the error to the next function, the framework omits all
 * the other middleware in the chain and skips straight to the error
 * handling middleware which is recognized by the fact that it has four arguments.'
 *
 * from : https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function ErrorMiddleware (err : Error, req : express.Request, res : express.Response, next: express.NextFunction) {
    if (err instanceof CustomError){
        err.log();// log the error
        res.status(err.getErrorCode() || 500).send(err.getResponse())
    }else{// unhandle error
        const error = new UnhandledError(err);

        error.log();
        res.status(error.getErrorCode()).send(error.getResponse())
    }
}