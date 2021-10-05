import { TypeDescriptor } from "../../base/TypeDescriptor";
import { FieldDescriptor as fd } from "../../base/FieldDescriptor";
import { FieldArrayDescriptor as fad} from "../../base/FieldArrayDescriptor";
import { UuidDescriptor } from "../../baseFields";
import { NumberDescriptor, ObjectTypeDescriptor, StringArrayDescriptor, StringDescriptor } from "../../baseTypes";

///////////////////////////////////////////////////
// champsResult
//////////////////////////////////////////////////
/**
 * describe champs using for front to adapt input
 */
export interface ChampsResult {
    [index: string]: string[] | number[];
}

const ChampsResultTypeDescriptor : TypeDescriptor<ChampsResult> = new TypeDescriptor<ChampsResult>("ChampsResult", "Un champs d'un item pour l'affichage des forms. Objet de la forme cle:tableau.");

const ChampsResultDescriptor : fd<ChampsResult> = new fd<ChampsResult>(
    "champs",
    "Les champs pour l'affichage des forms.",
    ChampsResultTypeDescriptor,
    true
)

///////////////////////////////////////////////////
// classesResult
//////////////////////////////////////////////////

/**
 * describe the class of the product
 */
export interface ClassesResult {
    principale: string;
    sous_classe: string ;
    sous_sous_classe : string;
}

const ClassesResultTypeDescriptor : TypeDescriptor<ClassesResult> = new TypeDescriptor<ClassesResult>("ClassesResult", "Les classes d'un item.");

const ClassesResultDescriptor : fd<ClassesResult> = new fd<ClassesResult>(
    "classes",
    "Les classes de l'item.",
    ClassesResultTypeDescriptor,
    true,
    new fd<string>(
        "principale",
        "La classe principale de l'item.",
        StringDescriptor
    ),
    new fd<string>(
        "sous_classe",
        "La classe secondaire de l'item.",
        StringDescriptor
    ),
    new fd<string>(
        "sous_sous_classe",
        "La classe tertiaire de l'item.",
        StringDescriptor
    ),
)

///////////////////////////////////////////////////
// ConditionnementResult
//////////////////////////////////////////////////

export interface ConditionnementResult {
    type : string ;
    nb_by_type? : number;
}

const ConditionnementResultTypeDescriptor : TypeDescriptor<ConditionnementResult> = new TypeDescriptor<ConditionnementResult>("ConditionnementResult", "Le conditionnement d'un item.");

const ConditionnementResultDescriptor : fd<ConditionnementResult> = new fd<ConditionnementResult>(
    "conditionnement",
    "Le conditionnement de l'item.",
    ConditionnementResultTypeDescriptor,
    true,
    new fd<string>(
        "type",
        "Le type de conditionnement.",
        StringDescriptor
    ),
    new fd<number>(
        "nb_by_type",
        "Le nombre d'unité de produit dans le type de conditionnement.",
        NumberDescriptor,
        false
    ),
)

///////////////////////////////////////////////////
// ItemInfoResult
//////////////////////////////////////////////////

/**
 * describe all the info of an item
 */
export interface ItemInfoResult {
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
    conditionnement : ConditionnementResult;

    // spécific
    classes: ClassesResult;
    spec: string[];

    // score to sort with a custom equation
    scoreCustom : number;
    // the evaluation by the customers
    evaluation: number;
}

const ItemInfoResultTypeDescriptor : TypeDescriptor<ItemInfoResult> = new TypeDescriptor<ItemInfoResult>("ItemInfoResult", "Les infos d'un item.");

const ItemInfoResultDescriptor : fd<ItemInfoResult> = new fd<ItemInfoResult>(
    "info",
    "Les info de l'item.",
    ItemInfoResultTypeDescriptor,
    true,
    // supplier
    new fd<string>(
        "supplier_ref",
        "La ref du fournisseur.",
        StringDescriptor
    ),
    new fd<string>(
        "link_product",
        "Le lien du produit vers la page du fournisseur.",
        StringDescriptor
    ),
    // generic
    new fd<string>(
        "item_name",
        "Le nom du produit.",
        StringDescriptor
    ),
    new fd<string>(
        "marque",
        "La marque du produit.",
        StringDescriptor
    ),
    new fd<string>(
        "description",
        "La description du produit.",
        StringDescriptor
    ),
    new fd<number>(
        "price",
        "Le prix du produit.",
        NumberDescriptor
    ),

    new fad<string[]>(
        "pictures",
        "Les liens des images de l'item.",
        StringArrayDescriptor,
        new fd<string>(
            "picture",
            "Un lien d'une image.",
            StringDescriptor
        )
    ),
    new fd<{[index: string]: string | number}>(
        "appearance",
        "L'aparence de l'item.",
        ObjectTypeDescriptor
    ),
    ConditionnementResultDescriptor,

    // specific
    ClassesResultDescriptor,
    new fad<string[]>(
        "spec",
        "Les spécifications de l'item.",
        StringArrayDescriptor,
        new fd<string>(
            "spec",
            "Une spécification d'une image.",
            StringDescriptor
        )
    ),

    // score to sort with a custom equation
    new fd<number>(
        "scoreCustom",
        "Le score calculer du produit.",
        NumberDescriptor
    ),
    new fd<number>(
        "evaluation",
        "L'évaluation données par les client du produit.",
        NumberDescriptor
    ),
)

///////////////////////////////////////////////////
// SupplierResult
//////////////////////////////////////////////////

/**
 * describe the informations for a supplier
 */
export interface SupplierResult {
    supplier_name : string;

    // product info
    info : ItemInfoResult;
}

const SupplierResultTypeDescriptor : TypeDescriptor<SupplierResult> = new TypeDescriptor<SupplierResult>("SupplierResult", "Le fournisseur d'un item.");

const SupplierResultArrayTypeDescriptor : TypeDescriptor<SupplierResult[]> = new TypeDescriptor<SupplierResult[]>("SupplierResult", "Des fournisseur d'un item.");


const SupplierResultDescriptor : fd<SupplierResult> = new fd<SupplierResult>(
    "suppliers",
    "Le fournisseur de l'item.",
    SupplierResultTypeDescriptor,
    true,
    new fd<string>(
        "supplier_name",
        "Le nom du fournisseur.",
        StringDescriptor
    ),
    ItemInfoResultDescriptor
)

///////////////////////////////////////////////////
// ItemResult
//////////////////////////////////////////////////

/**
 * describe an item
 */
export interface ItemResult{
    reference_etb: string;
    classes: ClassesResult;

    suppliers : SupplierResult[];// TODO : à trier dans l'ordre croissant à l'insertion dans la bdd

    champs: ChampsResult;
}


export const ItemResultTypeDescriptor : TypeDescriptor<ItemResult> = new TypeDescriptor<ItemResult>("ItemResult", "Un item de base de données en entier");

export const ItemResultArrayDescriptor : TypeDescriptor<ItemResult[]> = new TypeDescriptor<ItemResult[]>("ItemResult[]", "Un tableau d'item de base de données");

export const ItemResultDescriptor : fd<ItemResult> = new fd<ItemResult>(
    "item",
    "Un item de la base de données",
    ItemResultTypeDescriptor,
    true,
    new fd<string>(
        "reference_etb",
        "La reference interne de l'item.",
        StringDescriptor
    ),
    ClassesResultDescriptor,
    new fad<SupplierResult>(
        "suppliers",
        "Les fournisseurs du produit",
        SupplierResultArrayTypeDescriptor,
        SupplierResultDescriptor
    ),
    ChampsResultDescriptor
);