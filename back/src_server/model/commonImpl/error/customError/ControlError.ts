import { CustomError } from "../CustomError";
import { Category } from "typescript-logging";

/**
 * Get the error with a map to './config/app/error.conf'
 */
export class ControlError extends CustomError{
    /**
     * log the error
     */
     log() : void {
        this.logTool.info(this.message + " : " + this.errorInit.message);
    }
    /**
     *
     * @param codeMessage the code of the message in the config (parse by dotenv)
     * @param logTool the log tool to use for this error
     * @param error the base error
     * @param replacements the eventuel replacements to make in the final error message
     */
    constructor(codeMessage : string, logTool : Category, error : Error, ...replacements: string[]){
        super(codeMessage, 400, logTool, error, ...replacements)
    }
}