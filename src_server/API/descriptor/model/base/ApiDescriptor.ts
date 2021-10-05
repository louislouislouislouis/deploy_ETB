import config from "config";
import { RouteDescriptor, RouteDescriptorType } from "./RouteDescriptor";


/**
 *
 * @param profondeur le nombre de tabulation
 * @param markDecal if true, mark the tabulatioon
 * @retrun la tabulation
 */
export function getTab(profondeur : number, markDecal : boolean = true) : string {
    let allTab : string = "";
    let tab : string = "";
    let finalTab : string = "";

    for(let i = 0 ; i < (config.get("descriptor.nbSpaceByTab") as number) ; i++){
        if(i === 0){
            tab += "|";
            finalTab += "|";
        }else{
            tab += " ";
            if(markDecal){
                finalTab += "-";
            }else{
                finalTab += " ";
            }
        }
    }

    for(let i = 0 ; i < profondeur - 1; i++){
        allTab += tab;
    }

    allTab += finalTab;

    return allTab;
}

export interface ApiDescriptorType {
    name : string,
    description : string,
    routes :  RouteDescriptorType[]
}

export class ApiDescriptor{
    protected name : string;
    protected description : string;
    protected routes : {[index : string] : RouteDescriptor<any, any>};

    constructor(name : string, description : string, ...routes : RouteDescriptor<any, any>[]){
        this.name = name;
        this.description = description;

        const routeIndexe : {[index : string] : RouteDescriptor<any, any>} = {};
        for (const i in routes) {
            if (routes.hasOwnProperty(i)) {
                routeIndexe[routes[i].name] = routes[i];
            }
        }

        this.routes = routeIndexe;
    }

    /**
     * @return an humain readable string of this api
     */
    getHumainReadableString() : string {
        let routes :  string = "";
        for (const i in this.routes) {
            if (this.routes.hasOwnProperty(i)) {
                routes += this.routes[i].getHumainReadableString(1);
            }
        }

        return this.name + " : \n" +
        "description : " + this.description + "\n" +
        "routes      : " + routes;
    }

    /**
     *
     * @returns get the object representation of this field
     */
     getObject() : ApiDescriptorType {

        const routes :  RouteDescriptorType[] = [];
        for (const i in this.routes) {
            if (this.routes.hasOwnProperty(i)) {
                routes.push(this.routes[i].getObject());
            }
        }

        return {
            "name" : this.name,
            "description" : this.description,
            "routes" : routes
        }
    }

    getRouteFromName<input, output>(name : string) : RouteDescriptor<input, output>{
        return this.routes[name];
    }
}