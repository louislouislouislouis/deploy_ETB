import { TypeDescriptor } from "../../base/TypeDescriptor";

import { FieldDescriptor as fd } from "../../base/FieldDescriptor";
import { FieldDescriptorOutput as fdOutput } from "../../base/FieldDescriptorOutput";
import { FieldArrayDescriptor as fad} from "../../base/FieldArrayDescriptor";
import { NumberDescriptor, StringArrayDescriptor } from "../../baseTypes";
import { ItemResult, ItemResultArrayDescriptor, ItemResultDescriptor } from "./ItemResult";
/**
 * describe the meta of the search
 */
export interface SearchMeta {
    classes : string[];
    sous_classes : string[];
    sous_sous_classes : string[];
    suppliers : string[];
    company : string[];
    lowerPrice : number;
    higherPrice : number;
}

/**
 * the result of the search
 */
export interface SearchResult {
    items : ItemResult[];
    meta : SearchMeta;
}

const SearchMetaTypeDescriptor : TypeDescriptor<SearchMeta> = new TypeDescriptor<SearchMeta>(
    "SearchMeta",
    "Les métadonnées d'une recherche."
);

const SearchResultTypeDescriptor : TypeDescriptor<SearchResult> = new TypeDescriptor<SearchResult>(
    "SearchResult",
    "Les résultats d'une recherche."
);

const SearchMetaDescriptor : fd<SearchMeta> = new fd<SearchMeta>(
    "SearchMeta",
    "Les métadonnées d'une recherche",
    SearchMetaTypeDescriptor,
    true,
    new fd<string[]>(
        "classes",
        "Les categories présentes dans la recherche.",
        StringArrayDescriptor,
        true
    ),
    new fd<string[]>(
        "sous_classes",
        "Les sous categories présentes dans la recherche.",
        StringArrayDescriptor,
        true
    ),
    new fd<string[]>(
        "sous_sous_classes",
        "Les types de produits présentes dans la recherche.",
        StringArrayDescriptor,
        true
    ),
    new fd<string[]>(
        "suppliers",
        "Les fournisseurs présentes dans la recherche.",
        StringArrayDescriptor,
        true
    ),
    new fd<string[]>(
        "company",
        "Les marques présentes dans la recherche.",
        StringArrayDescriptor,
        true
    ),
    new fd<number>(
        "lowerPrice",
        "Le plus petit prix de la recherche.",
        NumberDescriptor,
        true
    ),
    new fd<number>(
        "higherPrice",
        "Le plus heut prix de la recherche.",
        NumberDescriptor,
        true
    )
);
export const SearchResultDescriptor : fdOutput<SearchResult> = new fdOutput<SearchResult>(
    "SearchResult",
    "Les résultats d'une recherche",
    SearchResultTypeDescriptor,
    true,
    SearchMetaDescriptor,
    new fad<ItemResult[]> (
        "items",
        "Les items trouvés.",
        ItemResultArrayDescriptor,
        ItemResultDescriptor
    )
);