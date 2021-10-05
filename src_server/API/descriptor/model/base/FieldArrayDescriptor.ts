import { FieldDescriptor } from "./FieldDescriptor";
import { TypeDescriptor } from "./TypeDescriptor";


/**
 * a field descriptor for an array of type
 */
 export class FieldArrayDescriptor<t> extends FieldDescriptor<t> {
    /**
     *
     * @param name the new name of the field descriptor
     * @param description the new description
     * @param type the type descriptor of the array
     * @param fieldDescriptor the base type descriptor
     * @param required if the field is required
     */
    constructor(name : string, description : string, type : TypeDescriptor<t>, fieldDescriptor : FieldDescriptor<any>, required : boolean = true) {
        super(name, description, type, required, ...fieldDescriptor.fields)
    }
}
