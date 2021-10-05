import { Category } from 'typescript-logging'
import {CustomError} from '../CustomError'
/**
 * Class of error if we aren't connected
 */
export class NotConnectedError extends CustomError {
    constructor(logTool : Category){
        super("control.connectionUnrecognizedUser", 401, logTool, null)
    }
}