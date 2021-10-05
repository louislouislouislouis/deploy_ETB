import {Category} from "typescript-logging";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
/**
 * base of all error in the application
 */
export abstract class CustomError extends Error{
    protected readonly errorCode : number;
    protected readonly title : string;
    protected readonly logTool : Category;
    protected readonly replacements : string[];
    protected readonly errorInit : Error;

    constructor(baseMessage: string, code : number, logTool : Category, errorInit : Error, ...replacements: string[]) {
        super(CustomError.getMessageFormat(baseMessage, CustomError.getMessage(baseMessage, replacements), code));
        this.errorCode = code;
        this.title = baseMessage;
        this.logTool = logTool;
        this.replacements = replacements;
        this.errorInit = errorInit;
    }

    /**
     *
     * @returns the error code number
     */
    getErrorCode() : number {
        return this.errorCode;
    }

   /**
    *
    * @param title the title of the error
    * @param fullMessage the full message of the error
    * @param code the code error of the error
    * @returns the full message of the error
    */
    private static getMessageFormat(title : string, fullMessage: string, code : number) : string {
        return title + " (http code " + code + ") -> " + fullMessage;
    }

    /**
     *
     * @returns get the object to send
     */
    getResponse() : object {
        return {
            "Error" : {
                    "title" : this.title,
                    "message" : this.message,
                    "code" : this.errorCode

            }
        };
    }

    /**
     * log the error
     */
    log() : void {
        if(this.errorInit === null){
            this.logTool.info(this.message)
        }else{
            this.logTool.error(this.message, this.errorInit)
        }
    }

    ///////////////////////////////////////////////////////////
    // static mapper
    ///////////////////////////////////////////////////////////


    private static errorMapper : object = null;

    /**
     *
     * @returns mount the mapper situate in the file './config/app/error.conf' and return true if it can map it
     */
    static mapperMount() : boolean {
        try {
            const nameOfFile : string = path.join(process.env.PROJECT_ROOT, "./config/app/error.conf");
            const data = fs.readFileSync(nameOfFile)
            CustomError.errorMapper = dotenv.parse(data)
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * transform a base error code in its corresponding value
     * @param errorCode  the error code
     * @param replacements the replacements to make in this error strings ('{0}' will be owerwritting with the first index of the tab, '{1}' the second....})
     * @returns
     */
    private static getMessage(errorCode : string, replacements : string[]) : string {
        if(CustomError.errorMapper != null && CustomError.errorMapper.hasOwnProperty(errorCode)){
            type key = keyof typeof CustomError.errorMapper
            let newMessage : string = this.errorMapper[errorCode as key];
            for (const i in replacements) {
                if (replacements.hasOwnProperty(i)) {
                    newMessage = newMessage.replace("{" + i + "}", replacements[i]);
                }
            }
            return newMessage;
        }
        else return "Une erreur est survenue.";
    }
}