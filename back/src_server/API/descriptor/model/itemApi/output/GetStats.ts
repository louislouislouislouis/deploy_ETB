import { TypeDescriptor } from "../../base/TypeDescriptor";

import { FieldDescriptor as fd } from "../../base/FieldDescriptor";
import { FieldDescriptorOutput as fdOutput } from "../../base/FieldDescriptorOutput";
import { NumberDescriptor, StringArrayDescriptor } from "../../baseTypes";


/**
 * the result of the GetStats
 */
 export interface GetStatsResult {
    higherPrice : number,
    lowerPrice : number,
    compagny : string[],
    category : string[],
    nbItem : number
}

const GetStatsResultTypeDescriptor : TypeDescriptor<GetStatsResult> = new TypeDescriptor<GetStatsResult>(
    "GetStatsResult",
    "Le resultat des stats du site."
);

export const GetStatsResultDescriptor : fdOutput<GetStatsResult> = new fdOutput<GetStatsResult>(
    "GetStatsResult",
    "Le resultat des stats du site.",
    GetStatsResultTypeDescriptor,
    true,
    new fd<number> (
        "higherPrice",
        "Le prix le plus haut.",
        NumberDescriptor,
        true
    ),
    new fd<number> (
        "lowerPrice",
        "Le prix le plus bas.",
        NumberDescriptor,
        true
    ),
    new fd<string[]>(
        "compagny",
        "Toutes les compagny présentes.",
        StringArrayDescriptor,
        true
    ),
    new fd<string[]>(
        "category",
        "Toutes les category présentes.",
        StringArrayDescriptor,
        true
    ),
    new fd<number> (
        "nbItem",
        "Le nombre d'item total.",
        NumberDescriptor,
        true
    )
);