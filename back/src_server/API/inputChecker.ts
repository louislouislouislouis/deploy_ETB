import * as safen from "safen"
import * as express from "express";
import { ControlError } from "../model/commonImpl/error/customError/ControlError";
import { logInput } from "../model/commonImpl/log/log";

/**
 * custom message for error in parsing. the message will be split with '/', the first elements is the code message for the error. The others
 * are the replacement (0 is always the path, the other are the param)
 */
export const customMessages : safen.CreateOptions = {
    messages: {
      number: ["control.input.valueMustBeNumber/:path", "control.input.valueMustBeNumber"],
      string: ["control.input.valueMustBeString/:path", "control.input.valueMustBeString"],

      array: ["control.input.valueMustBeArray/:path", "control.input.valueMustBeArray"],

      required: ["control.input.fieldRequired/:path", "control.input.fieldRequired"],

      min: ["control.input.valueInfToMin/:path/:param0", "control.input.valueInfToMin"],
      max: ["control.input.valueInfToMax/:path/:param0", "control.input.valueInfToMax"],
      length : ["control.input.valueMustBeLength/:path/:param0", "control.input.valueMustBeLength"],
      uuid: ["control.input.notAnUUID/:path", "control.input.notAnUUID"],
      in: ["control.input.valueMustBeIn/:path/:params", "control.input.valueMustBeIn"],
      regexp: ["control.input.valueMustBeRegexp/:path/:params", "control.input.valueMustBeRegexp"],
      port: ["control.input.valueMustBePort/:path", "control.input.valueMustBePort"]
    },
  };

export const EnvValidator : safen.Validator = safen.create(`{
    NODE_ENV:in("development", "production"),
    PROJECT_ROOT:any,
    SERVER_PORT:any,
    NODE_CONFIG_DIR:any,
    MONGODB_URL:any
}`, customMessages);

/**
 * check an object and throw an exception if it doesn't match
 * @param obj the object to validate
 * @param validator the validator
 * @throw Controlerror
 */
export function checkObject(obj : object, validator : safen.Validator) : void {
    try{
        validator.assert(obj);

    }catch (e) {
        if (e instanceof safen.InvalidValueError) {
            const array : string[] = e.errors[0].message.split("/");// one to one
            const code = array.shift();
            throw new ControlError(code, logInput, e, ...array);
        }
        throw e;
    }
}