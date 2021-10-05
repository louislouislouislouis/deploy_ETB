import { Category } from 'typescript-logging'
import {CustomError} from '../CustomError'
/**
 * Class of error when everytime we can't fund something
 */
export class NotFoundError extends CustomError {
    /**
     *
     * @param baseMessage the think which is missing
     * @param logTool the log tool to use for this error
     * @param replacements the eventuel replacements to make in the final error message
     */
    constructor(baseMessage : string, logTool : Category, ...replacements: string[]) {
        super(baseMessage, 404, logTool, null, ...replacements)
    }
}