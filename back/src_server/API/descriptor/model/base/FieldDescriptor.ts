import { getTab } from "./ApiDescriptor";
import { TypeDescriptor, TypeDescriptorType } from "./TypeDescriptor";
/**
 * output type of fieldDescriptor
 */
 export interface FieldDescriptorType {
    name : string,
    description : string,
    required : boolean,
    fields : FieldDescriptorType[],
    type : TypeDescriptorType
}

/**
 * define a generique field
 */
export class FieldDescriptor<t>{
    private _type: TypeDescriptor<t>;
    public get type(): TypeDescriptor<t> {
        return this._type;
    }
    private _name: string;
    public get name(): string {
        return this._name;
    }
    private _description: string;
    public get description(): string {
        return this._description;
    }
    private _required: boolean;
    public get required(): boolean {
        return this._required;
    }
    private _fields: FieldDescriptor<any>[];
    public get fields(): FieldDescriptor<any>[] {
        return this._fields;
    }


    constructor(name : string, description : string, type : TypeDescriptor<t>, required : boolean = true, ...fields : FieldDescriptor<any>[]) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._required = required;
        this._fields = fields;
    }

    /**
     * return a new descriptor from a base (allow reuse)
     * @param required if the field is required
     * @param descriptor the base descriptor
     * @returns a descriptore from the base one
     */
    static getFromBaseField<x>(required : boolean, descriptor : FieldDescriptor<x>) : FieldDescriptor<x> {
        return new FieldDescriptor<x>(descriptor._name, descriptor._description, descriptor._type, required, ...descriptor._fields);
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
            tab1 + 'fields      : ' + (this.fields.length > 0 ? "\n" : "") + this.fields.map(x => x.getHumainReadableString(profondeur + 1)).join("\n" + tabSansM + "-----------------------------" + "\n");
    }

    /**
     *
     * @returns get the object representation of this field
     */
    getObject() : FieldDescriptorType {
        return {
            "name" : this.name,
            "description" : this.description,
            "type" : this.type.getObject(),
            "required" : this.required,
            "fields" : this.fields.map(x => x.getObject())
        }
    }
}