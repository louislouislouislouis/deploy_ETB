import * as safen from "safen"
import { TypeDescriptor, TypeDescriptorType } from "./TypeDescriptor";
import { FieldDescriptor, FieldDescriptorType } from "./FieldDescriptor";
import { getTab } from "./ApiDescriptor";

/**
 * output type of fieldDescriptor
 */
 export interface FieldDescriptorInputType extends FieldDescriptorType {
    name : string,
    description : string,
    required : boolean,
    fields : FieldDescriptorType[],
    type : TypeDescriptorType,
    validator : safen.SflTester
}

/**
 * field for input
 */
export class FieldDescriptorInput<t> extends FieldDescriptor<t> {
    private _validator : safen.Validator<t>;
    public get validator(): safen.Validator<t> {
        return this._validator;
    }
    constructor(name : string, description : string, type : TypeDescriptor<t>, required : boolean = true, validator? : safen.Validator<t>, ...fields : FieldDescriptor<any>[]) {
        super(name, description, type, required, ...fields)
        this._validator = validator
    }

    /**
     * @param profondeur le nombre de tabulation
     * @return an humain readable string of this field
     */
     getHumainReadableString(profondeur : number) : string {
        const tabSansM : string = getTab(profondeur + 1, false);
        const tab : string = getTab(profondeur);
        const tab1 : string = getTab(profondeur + 1);


        return  tab + "*" + this.name + "*\n" +
        tab1 + 'description : ' + this.description + "\n" +
        tab1 + 'type        : ' + this.type.getHumainReadableString() + "\n" +
        tab1 + 'required    : ' + this.required + "\n" +
        tab1 + 'fields      : ' + (this.fields.length > 0 ? "\n" : "") + this.fields.map(x => x.getHumainReadableString(profondeur + 1)).join("\n" + tabSansM + "-----------------------------" + "\n") + "\n" +
        tab1 + "validator   : " + JSON.stringify(this._validator.ast);
    }

    /**
     *
     * @returns get the object representation of this field
     */
     getObject() : FieldDescriptorInputType {
        return {
            "name" : this.name,
            "description" : this.description,
            "type" : this.type.getObject(),
            "required" : this.required,
            "fields" : this.fields.map(x => x.getObject()),
            "validator" : this._validator.ast
        }
    }
}