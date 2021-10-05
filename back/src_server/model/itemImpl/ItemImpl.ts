import { CommandGetItemsByRefFromRequest } from "../../API/descriptor/model/itemApi/input/CommandGetItemsByRefFromRequest";
import { CommandSearchFromRequest } from "../../API/descriptor/model/itemApi/input/CommandSearchFromRequest";
import { GetItemsByRefResult } from "../../API/descriptor/model/itemApi/output/GetItemsByRefResult";
import { SearchResult } from "../../API/descriptor/model/itemApi/output/SearchResult";
import { getItemsByRef } from "./readside/GetByRef";
import { search } from "./readside/Search";
import { createDb } from "./writeside/CreateDb";



/**
 * only import of other service
 */
export const ItemImpl = {
    /**
     *
     * @param command the json to search (request for the data base)
     * @returns all the object matching and the category and company :
     * {
     *  "items" :[{...}],
     *  "meta" : {"category" : [...], "compagny" : [...]}
     * }
     *  @throw ControlError
     */
    search : async (command : CommandSearchFromRequest) : Promise<SearchResult> => {
        return search(command);
    },

    /**
     * getItemByRef
     * @param command
     * @return the item with ref in the command
     * @throw ControlError
     */
     getItemsByRef : async (command : CommandGetItemsByRefFromRequest) : Promise<GetItemsByRefResult> => {
        return getItemsByRef(command);
    },

    /**
     * create the item table
     * @returns
     * @throw ControlError
     */
    createDb : async () : Promise<void> => {
        return createDb();
    }
};