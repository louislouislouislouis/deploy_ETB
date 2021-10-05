import { Collection, MongoClient, ObjectId } from "mongodb";
import config from "config";

import { CommandGetItemsByRefFromRequest } from "../../../API/descriptor/model/itemApi/input/CommandGetItemsByRefFromRequest";
import { Database } from "../../commonImpl/Database";
import { convertItemV0ToResult, ItemV0 } from "../dataModelling/Item";
import { ControlError } from "../../commonImpl/error/customError/ControlError";
import { logItemImplReadside } from "../../commonImpl/log/log";
import { GetItemsByRefResult } from "../../../API/descriptor/model/itemApi/output/GetItemsByRefResult";

/**
 * getItem
 * @param command
 * @return the item with ref in the command
 */
 export async function getItemsByRef(command : CommandGetItemsByRefFromRequest) : Promise<GetItemsByRefResult> {
    let clientLocal : MongoClient;
    let result : ItemV0[] = null;
    try {
      // Connect the client to the server
      clientLocal = Database.getClient();
      const collection : Collection<ItemV0> = clientLocal.db(config.get("mongo.database.name")).collection(config.get("mongo.tables.items"));
      result = await collection.find({reference_etb : command.ref}).limit(config.get("search.limit")).toArray<ItemV0>();
    }catch(e){
      throw new ControlError("control.database.cantConnectToDatabase", logItemImplReadside, e);
    }
    if(!result){
      return {"items" : []};
    }else{
      return {"items" : result.map(x => convertItemV0ToResult(x))};
    }
  }