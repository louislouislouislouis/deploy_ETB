import config from "config";

/**
 * output type of typeDescriptor
 */
 export interface TypeDescriptorType {
    name : string,
    description : string,
};

/**
 * define a type
 */
 export class TypeDescriptor<t>{
    protected name : string
    protected description : string

    constructor(name : string, description : string) {
        this.name = name;
        this.description = description;
    }

    getName() : string {
        return this.name;
    }

    getDescription() : string {
        return this.description;
    }

    /**
     * @return an humain readable string of this type
     */
     getHumainReadableString() : string {
        return this.name + ' (' + this.description + ")";
    }

    /**
     *
     * @returns get the object representation of this type
     */
    getObject() : TypeDescriptorType {
        return {
            "name" : this.name,
            "description" : this.description
        };
    }
};
