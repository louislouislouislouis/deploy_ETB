import express from "express";
import { RouteDescriptor } from "../../API/descriptor/model/base/RouteDescriptor";
import { CommandGetItemsByRefFromRequest } from "../../API/descriptor/model/itemApi/input/CommandGetItemsByRefFromRequest";
import { CommandSearchFromRequest } from "../../API/descriptor/model/itemApi/input/CommandSearchFromRequest";
import { ItemApiDescriptor } from "../../API/descriptor/model/itemApi/ItemApiDescriptor";
import { GetItemsByRefResult } from "../../API/descriptor/model/itemApi/output/GetItemsByRefResult";
import { SearchResult } from "../../API/descriptor/model/itemApi/output/SearchResult";


import { ItemImpl } from "./ItemImpl";

/**
 * register the route of the item api
 * @param app the express app
 */
export const register = ( app: express.Application ) => {
    /**
     * handle the search function
     */
    app.post('/api/search', async function (req, res, next) {
        const route : RouteDescriptor<CommandSearchFromRequest, SearchResult> = ItemApiDescriptor.getRouteFromName("search");
        // parse the request :
        try{
            const requestParse : CommandSearchFromRequest = route.valideInput(req);
            const result : SearchResult = await ItemImpl.search(requestParse);
            res.send(result);
        }catch (e){
            next(e)
        }
    });

    /**
     * handle the itemsByRef function (get item by ref)
     */
     app.post('/api/itemsByRef', async function (req, res, next) {
        const route : RouteDescriptor<CommandGetItemsByRefFromRequest, GetItemsByRefResult> = ItemApiDescriptor.getRouteFromName("itemByRef");
        try{
            const requestParse : CommandGetItemsByRefFromRequest = route.valideInput(req);
            const result : GetItemsByRefResult = await ItemImpl.getItemsByRef(requestParse);
            res.send(result);
        }catch (e){
            next(e)
        }
    });

}