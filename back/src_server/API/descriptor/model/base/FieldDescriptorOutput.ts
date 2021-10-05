import * as safen from "safen"
import { TypeDescriptor } from "./TypeDescriptor";
import { FieldDescriptor } from "./FieldDescriptor";

/**
 * field for output
 */
 export class FieldDescriptorOutput<t> extends FieldDescriptor<t> {
    constructor(name : string, description : string, type : TypeDescriptor<t>, required : boolean = true, ...fields : FieldDescriptor<any>[]) {
        super(name, description, type, required, ...fields)
    }
}