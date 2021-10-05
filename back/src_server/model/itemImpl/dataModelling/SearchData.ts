import { CommandSearchFromRequest, SortCriteria, SortOrder } from "../../../API/descriptor/model/itemApi/input/CommandSearchFromRequest";
import { logItemImplReadside } from "../../commonImpl/log/log";
import {Collection, Document as DocMongo} from "mongodb"
import { ItemV0 } from "./Item";

////////////////////////////////////////////////////////////
/**
 * initialise the field fieldName with the possible value in the array for the find
 * @param init the init find object
 * @param fieldName the fieldName
 * @param possibleValue the possible value
 */
function findStringInValueArray(init : any, fieldName : string, possibleValue? : string[]) : any {
    if(possibleValue && possibleValue.length > 1 ){
        init[fieldName] = {$in: possibleValue};
    }else if(possibleValue && possibleValue.length === 1){
        init[fieldName] = possibleValue[0];
    }

    return init;
}

/**
 *
 * @param order the order
 * @return the mongo order (asc : 1, desc : -1)
 */
function convertSortOrder(order : SortOrder) : number {
    switch(order){
        case SortOrder.asc:
            return 1;
        case SortOrder.desc:
            return -1;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////

export interface ParseSearchRequest{
    find : any,
    project : any,
    sort : any
}

/**
 * transforme a command to a querry mongo
 * @param command the command to transforme
 * @returns the mongo querry
 */
export function parseSearchCommand(command : CommandSearchFromRequest) : ParseSearchRequest {
    const result : ParseSearchRequest = {find : {}, project : {}, sort : {}};

    // text search :
    if(command.request !== null && command.request !== ""){
        result.find.$text = {$search : command.request, $language : "fr", $caseSensitive : false, $diacriticSensitive : false};
    }

    // categorie :
    result.find = findStringInValueArray(result.find, "suppliers.info.classes.principale", command.classes);

    // sous categorie :
    result.find = findStringInValueArray(result.find, "suppliers.info.classes.sous_classe", command.sous_classes);

    // sous sous categorie :
    result.find = findStringInValueArray(result.find, "suppliers.info.classes.sous_sous_classe", command.sous_sous_classes);

    // sous sous categorie :
    result.find = findStringInValueArray(result.find, "suppliers.supplier_name", command.suppliers);

    // marque :
    result.find = findStringInValueArray(result.find, "suppliers.info.marque", command.company);

    // lower price and higher price (if at least one is in the range)
    if(command.lowerPrice && command.higherPrice){
        result.find.scoreMinPrice = { $gte: command.lowerPrice, $lte: command.higherPrice };

    }else if(command.lowerPrice){
        result.find.scoreMinPrice = { $gte: command.lowerPrice };
    }else if(command.higherPrice){
        result.find.scoreMinPrice = { $lte: command.higherPrice };
    }

    // sorting
    switch(command.sort.sortCriteria){
        case SortCriteria.price:
            result.sort.scoreMinPrice = convertSortOrder(command.sort.sortOrder)
            break;
        case SortCriteria.average:
            result.sort.scoreAveragePrice = convertSortOrder(command.sort.sortOrder)
            break;
        case SortCriteria.scoreCustom:
            result.sort.scoreMinCustom = convertSortOrder(command.sort.sortOrder)
            break;
        default:
    }
    result.sort._id = 1; // always the same order on 2 request

    logItemImplReadside.debug("Request search parsing : " + JSON.stringify(result));
    return result;
}


interface AgregateResult<t> {
    _id : t
}

/**
 * get the request for a "distinct" request in aggregation framework (limit, ....) and return this as a tableau
 * @param collection the collection to apply the aggregate
 * @param query the query for match the doc
 * @param field the field to project
 * @param limit the limit of result
 * @return the array of distinct value
 */
export async function getRequestDistinctWithLimit(collection : Collection<ItemV0>, query : object, field : string, limit : number) : Promise<string[]> {
    const request : DocMongo[] = [
        {$match : query},
        {$limit:limit},
        {$group:{
            _id: "$" + field
        }}
    ];

    logItemImplReadside.debug("Agregate distinct parsing : " + JSON.stringify(request));

    const resultOfRequest : AgregateResult<string>[] = (await collection.aggregate(request).toArray<AgregateResult<string>>())


    return resultOfRequest.map(x => x._id);
}