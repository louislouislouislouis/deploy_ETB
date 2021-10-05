import * as safen from "safen"
import { TypeDescriptor } from "../../base/TypeDescriptor";

import { FieldDescriptor as fd } from "../../base/FieldDescriptor";
import { FieldDescriptorInput as fdInput } from "../../base/FieldDescriptorInput";
import { customMessages } from "../../../../inputChecker";
import { NumberDescriptor, StringArrayDescriptor, StringDescriptor } from "../../baseTypes";

/**
 * get the sort criter of the search
 */
export enum SortCriteria {
    price,
    scoreCustom,
    average
}

const SortCriteriaTypeDescriptor : TypeDescriptor<SortCriteria> = new TypeDescriptor<SortCriteria>(
    "SortCriteria",
    "Les critères de tries. (0 : trie en fonction du prix, 1 : trie en fonction du score custom, 2 : trie en fonction d'un mélange des deux)"
);

const SortCriteriaDescriptor : fd<SortCriteria> = new fd<SortCriteria>(
    "sortCriteria",
    "Le critère de tri.",
    SortCriteriaTypeDescriptor,
    true
)

/**
 * get the sort order
 */
export enum SortOrder {
    asc,
    desc
}

const SortOrderTypeDescriptor : TypeDescriptor<SortOrder> = new TypeDescriptor<SortOrder>(
    "SortOrder",
    "L'ordre de tri. (0 : trie ascendant, 1 : trie descendant)"
);

const SortOrderDescriptor : fd<SortOrder> = new fd<SortOrder>(
    "sortOrder",
    "L'ordre' de tri.",
    SortOrderTypeDescriptor,
    true
)

/**
 * sort options
 */
export interface Sort {
    sortCriteria : SortCriteria;
    sortOrder : SortOrder;
}

const SortTypeDescriptor : TypeDescriptor<Sort> = new TypeDescriptor<Sort>(
    "Sort",
    "Les options de tries"
);

const SortDescriptor : fd<Sort> = new fd<Sort>(
    "sort",
    "les options de tris.",
    SortTypeDescriptor,
    true,
    SortCriteriaDescriptor,
    SortOrderDescriptor
)

/**
 * describe the data from the express request for the search api
 */
 export interface CommandSearchFromRequest{
    /**
     * generaly request
     */
    request:string;
    /**
     * an optionnally category of the item
     */
    classes?:string[];
    /**
     * an optionnally sous category of the item
     */
    sous_classes?:string[];
    /**
     * an optionnally sous sous category of the item
     */
    sous_sous_classes?:string[];
    /**
     * an optionnaly compagny
     */
    company?:string[];
    /**
     * an optionnaly suppliers
     */
    suppliers?:string[];
    /**
     * an optionnale lower price
     */
    lowerPrice?: number;
    /**
     * an optionnale higher price
     */
    higherPrice?: number;

    sort : Sort
  }

  const CommandSearchFromRequestTypeDescriptor : TypeDescriptor<CommandSearchFromRequest> = new TypeDescriptor<CommandSearchFromRequest>(
    "CommandSearchFromRequest",
    "Une demande de recherche."
  );

  export const CommandSearchFromRequestDescriptor : fdInput<CommandSearchFromRequest> = new fdInput<CommandSearchFromRequest>(
    "CommandSearchFromRequest",
    "Une recherche dans les items.",
    CommandSearchFromRequestTypeDescriptor,
    true,
    safen.create(`{
        request:string,
        classes?:string[],
        sous_classes?:string[],
        sous_sous_classes?:string[],
        suppliers?:string[],
        company?:string[],
        lowerPrice?: number & min(0),
        higherPrice?: number & min(0),
        sort : {
            sortCriteria : in(0, 1, 2),
            sortOrder : in(0, 1)
        }
    }`, customMessages),
    new fd<string>(
        "request",
        "La requete principale de recherche (vide = pas de filtre).",
        StringDescriptor
    ),
    new fd<string[]>(
        "classes",
        "Les categories voulues.",
        StringArrayDescriptor,
        false
    ),
    new fd<string[]>(
        "sous_classes",
        "Les sous categories voulues.",
        StringArrayDescriptor,
        false
    ),
    new fd<string[]>(
        "sous_sous_classes",
        "Les sous sous categories voulues.",
        StringArrayDescriptor,
        false
    ),
    new fd<string[]>(
        "suppliers",
        "Les fournisseurs voulues.",
        StringArrayDescriptor,
        false
    ),
    new fd<string[]>(
        "company",
        "Les marques voulues.",
        StringArrayDescriptor,
        false
    ),
    new fd<number>(
        "lowerPrice",
        "Le prix le plus faible voulu.",
        NumberDescriptor,
        false
    ),
    new fd<number>(
        "higherPrice",
        "Le prix le plus haut voulu.",
        NumberDescriptor,
        false
    ),
    SortDescriptor
);

