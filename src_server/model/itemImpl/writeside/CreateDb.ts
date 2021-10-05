import config from "config";
import path from "path";
import * as fileSystem from 'fs';
import { MongoClient } from "mongodb";
import parse from 'csv-parse/lib/sync';

import { Conditionnement, Item, ItemV0, Supplier, TemporaryDB } from "../dataModelling/Item";

import { Database } from "../../commonImpl/Database";
import { logItemImplWriteside } from "../../commonImpl/log/log";
import { ControlError } from "../../commonImpl/error/customError/ControlError";
import { deleteDoubleValue } from "../../commonImpl/common/arrayManip";

import { StatsDoc } from "../dataModelling/Stats";

/////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param currentPrice the price of this product
 * @param averagePrice the average price of this type of product
 * @param customerScore the customer score of this product
 * @returns a score for this product
 */
function getCustomScore(currentPrice : number, averagePrice : number, customerScore : number) : number {
  return (currentPrice/averagePrice)*0.3 + (customerScore/5)*0.7;
}

/**
 * @param version the version of the item
 * @param index an unique index (alea or in tab)
 * @returns the reference of an item
 */
function getRef(version : number, index : number) : string {
  return version.toString() + index.toString();
}

/**
 * build the temporary data
 */
function buildTempDB() : TemporaryDB {
  const pathToDB : string = path.join(process.env.PROJECT_ROOT, "./data/items.csv");
  const data : string = fileSystem.readFileSync(pathToDB).toString();
  logItemImplWriteside.debug("data : " + data );
  let resultFromCsv : (string | number)[][] = [];
  try{
    resultFromCsv = parse(data, {
      delimiter: config.get("csv.separator"),
      skip_empty_lines: true
    })
    logItemImplWriteside.debug("csv ok !");
  }catch(e){
    logItemImplWriteside.debug("csv pas ok !");
    throw new ControlError("control.database.cantParseDatabase", logItemImplWriteside, e);
  }


  // logItemImplWriteside.info(JSON.stringify(resultFromCsv));

  resultFromCsv.shift();// delete header

  const result : TemporaryDB = {
    items : resultFromCsv.map((oneLigneCsv, i) => {
      // appearence
      const appearance : {[index: string]: string | number;} = {};

      // conditionnement
      const conditionnement : Conditionnement = {
        type : oneLigneCsv[10] as string
      };
      if(oneLigneCsv[11] !== "") {
        conditionnement.nb_by_type = oneLigneCsv[11] as number;
      }

      // supplier /////////////////////////////////////////////////////
      const columnPriceSupplier : number[] = [25, 24, 23, 22].filter((priceColumn : number) => {
          return oneLigneCsv[priceColumn] !== "";// don't take the price null
        }
      );

      const priceBySupplier : number[] = columnPriceSupplier.map(priceIndex => (typeof oneLigneCsv[priceIndex] === "string" ? parseFloat(oneLigneCsv[priceIndex] as string) : oneLigneCsv[priceIndex] as number));
      // average price
      const averagePrice : number = priceBySupplier.reduce((previous, current) => previous + current)/columnPriceSupplier.length;


      const supplierName : string[] = ["MEGADENTAL", "EDD", "PROMODENTAIRE", "GACD"];
      const suppliers : Supplier[] = columnPriceSupplier.map((column, indexOfColumn) =>{
        // evaluation
        const evaluation : number = Math.random() * 5;
        const sup : Supplier = {
          supplier_name : supplierName[indexOfColumn],

          info : {
            supplier_ref : null,
            link_product : oneLigneCsv[column + 4].toString(),

            item_name : oneLigneCsv[0].toString(),
            marque : oneLigneCsv[7].toString(),
            description : oneLigneCsv[8].toString(),
            price : priceBySupplier[indexOfColumn],

            pictures : [oneLigneCsv[21] as string],
            appearance,
            conditionnement,

            classes : {
              principale : oneLigneCsv[4].toString(),
              sous_classe : oneLigneCsv[5].toString(),
              sous_sous_classe : oneLigneCsv[6].toString()
            },

            spec : null,
            scoreCustom : getCustomScore(priceBySupplier[indexOfColumn], averagePrice, evaluation),
            evaluation
          }
        }

        return sup;
      });

      // finalitem
      const item : ItemV0 = {
        version : 0,
        reference_etb : getRef(0, i),

        classes : {
          principale : oneLigneCsv[4].toString(),
          sous_classe : oneLigneCsv[5].toString(),
          sous_sous_classe : oneLigneCsv[6].toString()
        },

        suppliers,

        champs : {// TODO

        },
        // calcul average
        scoreAveragePrice : averagePrice,
        scoreMinPrice : suppliers.map((x : Supplier) => x.info.price).reduce((prec : number, next : number) => Math.min(prec, next)),
        scoreMinCustom : suppliers.map((x : Supplier) => x.info.scoreCustom).reduce((prec : number, next : number) => Math.min(prec, next)),
        scoreMinCustommer : suppliers.map((x : Supplier) => x.info.evaluation).reduce((prec : number, next : number) => Math.min(prec, next)),

        searchNames : deleteDoubleValue(suppliers.map((x : Supplier) => x.info.item_name)),
        searchMarques : deleteDoubleValue(suppliers.map((x : Supplier) => x.info.marque)),
        searchSousSousClasse : deleteDoubleValue(suppliers.map((x : Supplier) => x.info.classes.sous_sous_classe))
      }
      return item;
    })
  }
  return result;
}

/**
 *
 * @param db the temporary db
 * @return the stats generated from the db
 */
function genStats(db : TemporaryDB) : StatsDoc {
  // price
  let min = (db.items[0] as ItemV0).suppliers[0].info.price;
  let max = (db.items[0] as ItemV0).suppliers[0].info.price;
  for(const itemName in db.items) {
    if (db.items.hasOwnProperty(itemName)) {
      const price = (db.items[itemName] as ItemV0).suppliers[0].info.price;
      if(min > price) min = price;
      if(max < price) max = price;
    }
  }

  return {
    id : 1,
    minPrice : min,

    maxPrice : max,

    classes : deleteDoubleValue(db.items.map((item : Item) => (item as ItemV0).suppliers.map((x : Supplier) => x.info.classes.principale)).flat()),
    sous_classes : deleteDoubleValue(db.items.map((item : Item) => (item as ItemV0).suppliers.map((x : Supplier) => x.info.classes.sous_classe)).flat()),
    sous_sous_classes : deleteDoubleValue(db.items.map((item : Item) => (item as ItemV0).suppliers.map((x : Supplier) => x.info.classes.sous_sous_classe)).flat()),

    supplier_names : deleteDoubleValue(db.items.map((item : Item) => (item as ItemV0).suppliers.map((x : Supplier) => x.supplier_name)).flat())
  };
}

export async function createDb() : Promise<void>{
    let clientLocal : MongoClient;
    try{
        const db = buildTempDB();
        logItemImplWriteside.debug("temp db build !");
        const statsDB = genStats(db);
        logItemImplWriteside.debug("temp stats build !");

        // Connect the client to the server
        let dbMongo;
        let itemCollection;
        let statsCollection;
        try{
          clientLocal = Database.getClient();
          dbMongo = clientLocal.db(config.get("mongo.database.name"));
          itemCollection = dbMongo.collection(config.get("mongo.tables.items"));
          statsCollection = dbMongo.collection(config.get("mongo.tables.stats"));
        }catch(e){
          throw new ControlError("control.database.cantConnectToDatabase", logItemImplWriteside, e);
        }


        if(config.get("mongo.strategie") === "drop-and-create"){
          logItemImplWriteside.info("Try to build item collection ...");
          try{
            await itemCollection.drop();
          }catch(e){
            logItemImplWriteside.info("Can't drop collection " + config.get("mongo.tables.items") + "(possibly because it doesn't exist)")
          }
          await itemCollection.createIndex({ searchNames: "text", searchMarques : "text", searchSousSousClasse : "text" },
          {
            weights: {
              searchNames: 1,
              searchMarques : 1,
              searchSousSousClasse : 1
            },
            default_language: "french"
          })
          await itemCollection.insertMany(db.items);
          logItemImplWriteside.info("item collection build successfully");
///////////////////////////////////////////////////////////////////////////////////////////////////////////
          logItemImplWriteside.info("Try to build stats collection ...");
          try{
            await statsCollection.drop();
          }catch(e){
            logItemImplWriteside.info("Can't drop collection " + config.get("mongo.tables.stats") + "(possibly because it doesn't exist)")
          }

          logItemImplWriteside.info(JSON.stringify(statsDB));
          await statsCollection.insertOne(statsDB);
          logItemImplWriteside.info("stats collection build successfully");
        }
      }catch(e){
        throw e;
      }
}