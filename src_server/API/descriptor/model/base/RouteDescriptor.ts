import express from "express";
import { checkObject } from "../../../inputChecker";
import { getTab } from "./ApiDescriptor";
import { FieldDescriptorType } from "./FieldDescriptor";
import { FieldDescriptorInput } from "./FieldDescriptorInput";
import { FieldDescriptorOutput } from "./FieldDescriptorOutput";
/**
 * type of a route
 */
 export enum RouteType {
    POST,
    GET
  }

/**
 * output type of routeDescriptor
 */
 export interface RouteDescriptorType {
    name : string,
    description : string,
    type : string,
    input : FieldDescriptorType,
    output : FieldDescriptorType
}


/**
 * define a route
 */
export class RouteDescriptor<inputType, outputType> {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    private _route: string;
    protected get route(): string {
        return this._route;
    }
    private _type: RouteType;
    protected get type(): RouteType {
        return this._type;
    }
    private _description: string;
    protected get description(): string {
        return this._description;
    }
    private _input: FieldDescriptorInput<inputType>;
    protected get input(): FieldDescriptorInput<inputType> {
        return this._input;
    }
    private _output: FieldDescriptorOutput<outputType>;
    protected get output(): FieldDescriptorOutput<outputType> {
        return this._output;
    }

    constructor(route : string, name : string, type : RouteType, description : string, input : FieldDescriptorInput<inputType>, output : FieldDescriptorOutput<outputType>) {
        this._name = name;
        this._route = route;
        this._type = type;
        this._description = description;
        this._input = input;
        this._output = output;
    }

    /**
     * validate a request and return the input
     * @param req the request to validate
     * @returns the input type
     * @throws ControlError
     */
    valideInput(req : express.Request) : inputType {
        try{
            checkObject(req.body, this.input.validator);
            const retour : inputType = req.body;
            return retour;
        }catch (e) {
            throw e;
        }
    }

    /**
     * @return an humain readable string of this api
     */
     getHumainReadableString(profondeur : number) : string {
        const tab : string = getTab(profondeur);
        return tab + this.name + "\n"+
        tab + "description : " + this.description + "\n" +
        tab + "type        : " + RouteDescriptor.getStringRepresentationRouteType(this.type) + "\n" +
        tab + "input       : \n" + this.input.getHumainReadableString(profondeur + 1) + "\n" +
        tab + "output      : \n" + this.output.getHumainReadableString(profondeur + 1) + "\n";
    }

    /**
     *
     * @returns get the object representation of this field
     */
     getObject() : RouteDescriptorType {
        return {
            "name" : this.name,
            "description" : this.description,
            "type" : RouteDescriptor.getStringRepresentationRouteType(this.type),
            "input" : this.input.getObject(),
            "output" : this.output.getObject()
        }
    }

    static getStringRepresentationRouteType(route : RouteType) : string {
        switch(route){
            case RouteType.GET :
                return "GET";
            case RouteType.POST :
                return "POST";
        }
    }
}
