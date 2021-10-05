import { Document, ObjectId } from "mongodb";
import { ChampsResult, ClassesResult, ConditionnementResult, ItemInfoResult, ItemResult, SupplierResult } from "../../../API/descriptor/model/itemApi/output/ItemResult";

  /**
   * describe the temporary database
   */
   export interface TemporaryDB {
    items:Item[];
  }

/////////////////////////////////////////////////////////
// data modelling
///////////////////////////////////////////////////////

export interface Item extends Document{
  _id?: ObjectId;
  version : number;
}

//////////////////////////////////////////////////////////////////////
// v0

/**
 * describe champs using for front to adapt input
 */
export interface Champs {
  [index: string]: string[] | number[];
}

/**
 * describe the class of the product
 */
export interface Classes {
  principale: string;
  sous_classe: string ;
  sous_sous_classe : string;
}

export interface Conditionnement {
  type : string ;
  nb_by_type? : number;
}

/**
 * describe all the info of an item
 */
export interface ItemInfo {
  // supplier
  supplier_ref : string;
  link_product: string;
  // generic
  item_name: string;
  marque : string;
  description: string;
  price : number;

  pictures : string[];
  appearance: {[index: string]: string | number;};
  conditionnement : Conditionnement;

  // spécific
  classes: Classes;
  spec: string[];

  // score to sort with a custom equation
  scoreCustom : number;
  // the evaluation by the customers
  evaluation: number;
}

/**
 * describe the informations for a supplier
 */
 export interface Supplier {
  supplier_name : string;

  // product info
  info : ItemInfo;
}

/**
 * describe an item
 */
export interface ItemV0 extends Item{
    version : 0;
    reference_etb: string;
    classes: Classes;

    suppliers : Supplier[];// TODO : à trier dans l'ordre croissant à l'insertion dans la bdd

    champs: Champs;


    /////////////////////////////////////////////////////
    // Search and calcul
    // to calcul score > average price
    scoreAveragePrice : number;
    // min price of the supplier
    scoreMinPrice : number;
    // min custom score of the supplier
    scoreMinCustom : number;
    // min custommer score of the supplier
    scoreMinCustommer : number;

    searchNames : string[];
    searchMarques : string[];
    searchSousSousClasse : string[];
}

// conversion

/**
 * force an object id to a string
 * @param id
 * @returns
 */
 function convertObjectIdToString(id : ObjectId) : string {
  return id.toHexString();
}

/**
 * convert a champs to champResult
 * @param champs the champs initial
 * @returns champsResult
 */
function convertChampsToResult(champs : Champs) : ChampsResult {
  return champs;
}

function convertConditionnementToResult(conditionnement : Conditionnement) : ConditionnementResult {
  return {
    type : conditionnement.type,
    nb_by_type : conditionnement.nb_by_type
  };
}

function convertClassesToResult(classe : Classes) : ClassesResult {
  return {
    principale : classe.principale,
    sous_classe : classe.sous_classe,
    sous_sous_classe : classe.sous_sous_classe
  };
}

function convertItemInfoToResult(itemInfo : ItemInfo) : ItemInfoResult {
  return {
    supplier_ref : itemInfo.supplier_ref,
    link_product : itemInfo.link_product,

    item_name : itemInfo.item_name,
    marque : itemInfo.marque,
    description : itemInfo.description,
    price : itemInfo.price,

    pictures : itemInfo.pictures,
    appearance : itemInfo.appearance,
    conditionnement : convertConditionnementToResult(itemInfo.conditionnement),

    classes : convertClassesToResult(itemInfo.classes),
    spec : itemInfo.spec,

    scoreCustom : itemInfo.scoreCustom,
    evaluation : itemInfo.evaluation
  };
}

function convertSupplierToResult(supplier : Supplier) : SupplierResult {
  return {
    supplier_name : supplier.supplier_name,
    info : convertItemInfoToResult(supplier.info)
  };
}

/**
 * convert an item to an itemResult
 * @param item the item
 * @returns
 */
export function convertItemV0ToResult(item : ItemV0) : ItemResult {
  return {
    reference_etb : item.reference_etb,
    classes : item.classes,
    suppliers : item.suppliers.map(x => convertSupplierToResult(x)),
    champs : convertChampsToResult(item.champs)
  };
}

// end V0
/////////////////////////////////////////////////////////////////////////////////////////////