import config from "config";
import { Collection, MongoClient } from "mongodb";

import { CommandSearchFromRequest } from "../../../API/descriptor/model/itemApi/input/CommandSearchFromRequest";
import { SearchResult } from "../../../API/descriptor/model/itemApi/output/SearchResult";
import { Database } from "../../commonImpl/Database";
import { ControlError } from "../../commonImpl/error/customError/ControlError";
import { logItemImplReadside } from "../../commonImpl/log/log";
import { convertItemV0ToResult, ItemV0 } from "../dataModelling/Item";
import { parseSearchCommand } from "../dataModelling/SearchData";




/**
 *
 * @param command the json to search (request for the data base)
 * @returns all the object matching and the category and company :
 * {
 *  "items" :[{...}],
 *  "meta" : {"category" : [...], "compagny" : [...]}
 * }
 */
export async function search(command : CommandSearchFromRequest) : Promise<SearchResult> {
    let clientLocal : MongoClient;
    let result : ItemV0[] = [];

    try {
      // Connect the client to the server
      clientLocal = Database.getClient();
      const collection : Collection<ItemV0> = clientLocal.db(config.get("mongo.database.name")).collection(config.get("mongo.tables.items"));
      const MongoJsonRequest = parseSearchCommand(command);
      const mongoRequest = collection.find(MongoJsonRequest.find)
          .project(MongoJsonRequest.project)
          .sort(MongoJsonRequest.sort)
          .limit(config.get("search.limit"));

      result = await mongoRequest.toArray<ItemV0>();
      // logItemImplReadside.debug("result : " + JSON.stringify(result))
    }catch(e){
      throw new ControlError("control.database.cantConnectToDatabase", logItemImplReadside, e);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////

    // compute max/min
    let lowerPrice : number = 0;
    let higherPrice : number = 0;
    if(result.length > 0 && result[0].suppliers[0].info.price > 0){
      lowerPrice = result[0].suppliers[0].info.price;
      higherPrice = result[0].suppliers[0].info.price;
    }

    // compute marque and classe
    const classesPrincipales : string[] = [];
    const sousClasses : string[] = [];
    const sousSousClasses : string[] = [];
    const suppliers : string[] = [];
    const marques : string[] = [];

    for(const itemName in result) {
      if (result.hasOwnProperty(itemName)) {
        // supplier
        for(const supplierName in result[itemName].suppliers){
          if (result[itemName].suppliers.hasOwnProperty(supplierName)) {
            const info = result[itemName].suppliers[supplierName].info;

            if(info.price < lowerPrice) lowerPrice = info.price;
            if(info.price > higherPrice) higherPrice = info.price;

            // classe and marque
            if(classesPrincipales.indexOf(info.classes.principale) === -1) classesPrincipales.push(info.classes.principale);
            if(sousClasses.indexOf(info.classes.sous_classe) === -1) sousClasses.push(info.classes.sous_classe);
            if(sousSousClasses.indexOf(info.classes.sous_sous_classe) === -1) sousSousClasses.push(info.classes.sous_sous_classe);

            if(suppliers.indexOf(result[itemName].suppliers[supplierName].supplier_name) === -1) suppliers.push(result[itemName].suppliers[supplierName].supplier_name);

            if(marques.indexOf(info.marque) === -1) marques.push(info.marque);
          }
        }
      }
    }

    const returnValue : SearchResult = {
        items : result.map(x => convertItemV0ToResult(x)),
        meta : {
          classes : classesPrincipales,
          sous_classes : sousClasses,
          sous_sous_classes : sousSousClasses,

          suppliers,

          company : marques,
          lowerPrice,
          higherPrice
        }
    }

    return returnValue;
  }