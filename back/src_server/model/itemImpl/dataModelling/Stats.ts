import { Document, ObjectId } from "mongodb";

/**
 * represent stats of the item data
 */
export interface StatsDoc extends Document{
    _id?: ObjectId;

    // price
    minPrice : number;
    maxPrice : number;

    // classes
    classes : string[];
    sous_classes : string[];
    sous_sous_classes : string[];

    // supplier
    supplier_names : string[];
}