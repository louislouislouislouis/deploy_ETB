import { logDefault } from "../../log/log";
import { CustomError } from "../CustomError";

/**
 * Class of error when everytime we can't fund something
 */
 export class UnhandledError extends CustomError {
    constructor(error : Error){
        super("divers.unhandledError", 500, logDefault, error)
    }
 }