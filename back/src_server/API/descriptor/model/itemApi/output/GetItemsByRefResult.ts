import { TypeDescriptor } from "../../base/TypeDescriptor";

import { FieldArrayDescriptor as fad} from "../../base/FieldArrayDescriptor";
import { FieldDescriptorOutput as fdOutput } from "../../base/FieldDescriptorOutput";
import { ItemResultDescriptor, ItemResult, ItemResultArrayDescriptor } from "./ItemResult";

/**
 * the result of the GetItemById
 */
export interface GetItemsByRefResult {
    items : ItemResult[];
}

const GetItemsByRefResultTypeDescriptor : TypeDescriptor<GetItemsByRefResult> = new TypeDescriptor<GetItemsByRefResult>(
    "GetItemsByRefResult",
    "Le resultat d'une demande d'item par reference."
);

export const GetItemsByRefResultDescriptor : fdOutput<GetItemsByRefResult> = new fdOutput<GetItemsByRefResult>(
    "GetItemsByRefResult",
    "Les résultats d'une recherche d'item par reference",
    GetItemsByRefResultTypeDescriptor,
    true,
    new fad<ItemResult[]> (
        "items",
        "Les items trouvés.",
        ItemResultArrayDescriptor,
        ItemResultDescriptor
    )
);