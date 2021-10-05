import { ApiDescriptorType } from "./model/base/ApiDescriptor";
import { ItemApiDescriptor } from "./model/itemApi/ItemApiDescriptor";


export interface APIDescriptor {
    apis : ApiDescriptorType[]
}

export const ServerHumainReadableDescriptor : string = ItemApiDescriptor.getHumainReadableString();

export const ServerDescriptor : APIDescriptor = {
    "apis" : [
        ItemApiDescriptor.getObject()
    ]
}