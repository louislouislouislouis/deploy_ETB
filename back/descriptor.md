ItemApi : 
description : L'api de gestion des items.
routes      : |-search
|-description : Effectu une recherche sur la base de données et essaye de renvoyer les items pouvant correspondres.
|-type        : POST
|-input       : 
| |-*CommandSearchFromRequest*
| | |-description : Une recherche dans les items.
| | |-type        : CommandSearchFromRequest (Une demande de recherche.)
| | |-required    : true
| | |-fields      : 
| | |-*request*
| | | |-description : La requete principale de recherche (vide = pas de filtre).
| | | |-type        : string (Une chaine de caractères)
| | | |-required    : true
| | | |-fields      : 
| | | -----------------------------
| | |-*classes*
| | | |-description : Les categories voulues.
| | | |-type        : string[] (un tableau de chaines de caractères)
| | | |-required    : false
| | | |-fields      : 
| | | -----------------------------
| | |-*sous_classes*
| | | |-description : Les sous categories voulues.
| | | |-type        : string[] (un tableau de chaines de caractères)
| | | |-required    : false
| | | |-fields      : 
| | | -----------------------------
| | |-*sous_sous_classes*
| | | |-description : Les sous sous categories voulues.
| | | |-type        : string[] (un tableau de chaines de caractères)
| | | |-required    : false
| | | |-fields      : 
| | | -----------------------------
| | |-*suppliers*
| | | |-description : Les fournisseurs voulues.
| | | |-type        : string[] (un tableau de chaines de caractères)
| | | |-required    : false
| | | |-fields      : 
| | | -----------------------------
| | |-*company*
| | | |-description : Les marques voulues.
| | | |-type        : string[] (un tableau de chaines de caractères)
| | | |-required    : false
| | | |-fields      : 
| | | -----------------------------
| | |-*lowerPrice*
| | | |-description : Le prix le plus faible voulu.
| | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | |-required    : false
| | | |-fields      : 
| | | -----------------------------
| | |-*higherPrice*
| | | |-description : Le prix le plus haut voulu.
| | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | |-required    : false
| | | |-fields      : 
| | | -----------------------------
| | |-*sort*
| | | |-description : les options de tris.
| | | |-type        : Sort (Les options de tries)
| | | |-required    : true
| | | |-fields      : 
| | | |-*sortCriteria*
| | | | |-description : Le critère de tri.
| | | | |-type        : SortCriteria (Les critères de tries. (0 : trie en fonction du prix, 1 : trie en fonction du score custom, 2 : trie en fonction d'un mélange des deux))
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*sortOrder*
| | | | |-description : L'ordre' de tri.
| | | | |-type        : SortOrder (L'ordre de tri. (0 : trie ascendant, 1 : trie descendant))
| | | | |-required    : true
| | | | |-fields      : 
| | |-validator   : {"type":"object","properties":{"request":{"optional":false,"value":{"type":"scalar","name":"string","params":[]}},"classes":{"optional":true,"value":{"type":"array","value":{"type":"scalar","name":"string","params":[]}}},"sous_classes":{"optional":true,"value":{"type":"array","value":{"type":"scalar","name":"string","params":[]}}},"sous_sous_classes":{"optional":true,"value":{"type":"array","value":{"type":"scalar","name":"string","params":[]}}},"suppliers":{"optional":true,"value":{"type":"array","value":{"type":"scalar","name":"string","params":[]}}},"company":{"optional":true,"value":{"type":"array","value":{"type":"scalar","name":"string","params":[]}}},"lowerPrice":{"optional":true,"value":{"type":"and","params":[{"type":"scalar","name":"number","params":[]},{"type":"scalar","name":"min","params":[0]}]}},"higherPrice":{"optional":true,"value":{"type":"and","params":[{"type":"scalar","name":"number","params":[]},{"type":"scalar","name":"min","params":[0]}]}},"sort":{"optional":false,"value":{"type":"object","properties":{"sortCriteria":{"optional":false,"value":{"type":"scalar","name":"in","params":[0,1,2]}},"sortOrder":{"optional":false,"value":{"type":"scalar","name":"in","params":[0,1]}}}}}}}
|-output      : 
| |-*SearchResult*
| | |-description : Les résultats d'une recherche
| | |-type        : SearchResult (Les résultats d'une recherche.)
| | |-required    : true
| | |-fields      : 
| | |-*SearchMeta*
| | | |-description : Les métadonnées d'une recherche
| | | |-type        : SearchMeta (Les métadonnées d'une recherche.)
| | | |-required    : true
| | | |-fields      : 
| | | |-*classes*
| | | | |-description : Les categories présentes dans la recherche.
| | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*sous_classes*
| | | | |-description : Les sous categories présentes dans la recherche.
| | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*sous_sous_classes*
| | | | |-description : Les types de produits présentes dans la recherche.
| | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*suppliers*
| | | | |-description : Les fournisseurs présentes dans la recherche.
| | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*company*
| | | | |-description : Les marques présentes dans la recherche.
| | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*lowerPrice*
| | | | |-description : Le plus petit prix de la recherche.
| | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*higherPrice*
| | | | |-description : Le plus heut prix de la recherche.
| | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | |-required    : true
| | | | |-fields      : 
| | | -----------------------------
| | |-*items*
| | | |-description : Les items trouvés.
| | | |-type        : ItemResult[] (Un tableau d'item de base de données)
| | | |-required    : true
| | | |-fields      : 
| | | |-*reference_etb*
| | | | |-description : La reference interne de l'item.
| | | | |-type        : string (Une chaine de caractères)
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*classes*
| | | | |-description : Les classes de l'item.
| | | | |-type        : ClassesResult (Les classes d'un item.)
| | | | |-required    : true
| | | | |-fields      : 
| | | | |-*principale*
| | | | | |-description : La classe principale de l'item.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | -----------------------------
| | | | |-*sous_classe*
| | | | | |-description : La classe secondaire de l'item.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | -----------------------------
| | | | |-*sous_sous_classe*
| | | | | |-description : La classe tertiaire de l'item.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | -----------------------------
| | | |-*suppliers*
| | | | |-description : Les fournisseurs du produit
| | | | |-type        : SupplierResult (Des fournisseur d'un item.)
| | | | |-required    : true
| | | | |-fields      : 
| | | | |-*supplier_name*
| | | | | |-description : Le nom du fournisseur.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | -----------------------------
| | | | |-*info*
| | | | | |-description : Les info de l'item.
| | | | | |-type        : ItemInfoResult (Les infos d'un item.)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | |-*supplier_ref*
| | | | | | |-description : La ref du fournisseur.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*link_product*
| | | | | | |-description : Le lien du produit vers la page du fournisseur.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*item_name*
| | | | | | |-description : Le nom du produit.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*marque*
| | | | | | |-description : La marque du produit.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*description*
| | | | | | |-description : La description du produit.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*price*
| | | | | | |-description : Le prix du produit.
| | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*pictures*
| | | | | | |-description : Les liens des images de l'item.
| | | | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*appearance*
| | | | | | |-description : L'aparence de l'item.
| | | | | | |-type        : {[index: string]: string | number} (Une map quelquonque contenant des clées string et des valeurs string ou nombres.)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*conditionnement*
| | | | | | |-description : Le conditionnement de l'item.
| | | | | | |-type        : ConditionnementResult (Le conditionnement d'un item.)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | |-*type*
| | | | | | | |-description : Le type de conditionnement.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | | -----------------------------
| | | | | | |-*nb_by_type*
| | | | | | | |-description : Le nombre d'unité de produit dans le type de conditionnement.
| | | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | | |-required    : false
| | | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*classes*
| | | | | | |-description : Les classes de l'item.
| | | | | | |-type        : ClassesResult (Les classes d'un item.)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | |-*principale*
| | | | | | | |-description : La classe principale de l'item.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | | -----------------------------
| | | | | | |-*sous_classe*
| | | | | | | |-description : La classe secondaire de l'item.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | | -----------------------------
| | | | | | |-*sous_sous_classe*
| | | | | | | |-description : La classe tertiaire de l'item.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*spec*
| | | | | | |-description : Les spécifications de l'item.
| | | | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*scoreCustom*
| | | | | | |-description : Le score calculer du produit.
| | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*evaluation*
| | | | | | |-description : L'évaluation données par les client du produit.
| | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | -----------------------------
| | | |-*champs*
| | | | |-description : Les champs pour l'affichage des forms.
| | | | |-type        : ChampsResult (Un champs d'un item pour l'affichage des forms. Objet de la forme cle:tableau.)
| | | | |-required    : true
| | | | |-fields      : 
|-itemByRef
|-description : Effectu une recherche sur la base de données et renvois les items correspondant à la reference, si il n'y en a pas, renvois null.
|-type        : POST
|-input       : 
| |-*CommandGetItemsByRefFromRequest*
| | |-description : une demande d'items spécifique par reference.
| | |-type        : CommandGetItemsByRefFromRequest (Une demande d'items spécifique par reference.)
| | |-required    : true
| | |-fields      : 
| | |-*ref*
| | | |-description : la reference.
| | | |-type        : string (Une chaine de caractères)
| | | |-required    : true
| | | |-fields      : 
| | |-validator   : {"type":"object","properties":{"ref":{"optional":false,"value":{"type":"and","params":[{"type":"scalar","name":"string","params":[]},{"type":"scalar","name":"length","params":[4]}]}}}}
|-output      : 
| |-*GetItemsByRefResult*
| | |-description : Les résultats d'une recherche d'item par reference
| | |-type        : GetItemsByRefResult (Le resultat d'une demande d'item par reference.)
| | |-required    : true
| | |-fields      : 
| | |-*items*
| | | |-description : Les items trouvés.
| | | |-type        : ItemResult[] (Un tableau d'item de base de données)
| | | |-required    : true
| | | |-fields      : 
| | | |-*reference_etb*
| | | | |-description : La reference interne de l'item.
| | | | |-type        : string (Une chaine de caractères)
| | | | |-required    : true
| | | | |-fields      : 
| | | | -----------------------------
| | | |-*classes*
| | | | |-description : Les classes de l'item.
| | | | |-type        : ClassesResult (Les classes d'un item.)
| | | | |-required    : true
| | | | |-fields      : 
| | | | |-*principale*
| | | | | |-description : La classe principale de l'item.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | -----------------------------
| | | | |-*sous_classe*
| | | | | |-description : La classe secondaire de l'item.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | -----------------------------
| | | | |-*sous_sous_classe*
| | | | | |-description : La classe tertiaire de l'item.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | -----------------------------
| | | |-*suppliers*
| | | | |-description : Les fournisseurs du produit
| | | | |-type        : SupplierResult (Des fournisseur d'un item.)
| | | | |-required    : true
| | | | |-fields      : 
| | | | |-*supplier_name*
| | | | | |-description : Le nom du fournisseur.
| | | | | |-type        : string (Une chaine de caractères)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | -----------------------------
| | | | |-*info*
| | | | | |-description : Les info de l'item.
| | | | | |-type        : ItemInfoResult (Les infos d'un item.)
| | | | | |-required    : true
| | | | | |-fields      : 
| | | | | |-*supplier_ref*
| | | | | | |-description : La ref du fournisseur.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*link_product*
| | | | | | |-description : Le lien du produit vers la page du fournisseur.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*item_name*
| | | | | | |-description : Le nom du produit.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*marque*
| | | | | | |-description : La marque du produit.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*description*
| | | | | | |-description : La description du produit.
| | | | | | |-type        : string (Une chaine de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*price*
| | | | | | |-description : Le prix du produit.
| | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*pictures*
| | | | | | |-description : Les liens des images de l'item.
| | | | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*appearance*
| | | | | | |-description : L'aparence de l'item.
| | | | | | |-type        : {[index: string]: string | number} (Une map quelquonque contenant des clées string et des valeurs string ou nombres.)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*conditionnement*
| | | | | | |-description : Le conditionnement de l'item.
| | | | | | |-type        : ConditionnementResult (Le conditionnement d'un item.)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | |-*type*
| | | | | | | |-description : Le type de conditionnement.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | | -----------------------------
| | | | | | |-*nb_by_type*
| | | | | | | |-description : Le nombre d'unité de produit dans le type de conditionnement.
| | | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | | |-required    : false
| | | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*classes*
| | | | | | |-description : Les classes de l'item.
| | | | | | |-type        : ClassesResult (Les classes d'un item.)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | |-*principale*
| | | | | | | |-description : La classe principale de l'item.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | | -----------------------------
| | | | | | |-*sous_classe*
| | | | | | | |-description : La classe secondaire de l'item.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | | -----------------------------
| | | | | | |-*sous_sous_classe*
| | | | | | | |-description : La classe tertiaire de l'item.
| | | | | | | |-type        : string (Une chaine de caractères)
| | | | | | | |-required    : true
| | | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*spec*
| | | | | | |-description : Les spécifications de l'item.
| | | | | | |-type        : string[] (un tableau de chaines de caractères)
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*scoreCustom*
| | | | | | |-description : Le score calculer du produit.
| | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | | | -----------------------------
| | | | | |-*evaluation*
| | | | | | |-description : L'évaluation données par les client du produit.
| | | | | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | | | | |-required    : true
| | | | | | |-fields      : 
| | | | -----------------------------
| | | |-*champs*
| | | | |-description : Les champs pour l'affichage des forms.
| | | | |-type        : ChampsResult (Un champs d'un item pour l'affichage des forms. Objet de la forme cle:tableau.)
| | | | |-required    : true
| | | | |-fields      : 
|-stats
|-description : Genere des stats divers a partir de la base de données.
|-type        : POST
|-input       : 
| |-*void*
| | |-description : Un input vide.
| | |-type        : void (vide)
| | |-required    : true
| | |-fields      : 
| | |-validator   : {"type":"object","properties":{}}
|-output      : 
| |-*GetStatsResult*
| | |-description : Le resultat des stats du site.
| | |-type        : GetStatsResult (Le resultat des stats du site.)
| | |-required    : true
| | |-fields      : 
| | |-*higherPrice*
| | | |-description : Le prix le plus haut.
| | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | |-required    : true
| | | |-fields      : 
| | | -----------------------------
| | |-*lowerPrice*
| | | |-description : Le prix le plus bas.
| | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | |-required    : true
| | | |-fields      : 
| | | -----------------------------
| | |-*compagny*
| | | |-description : Toutes les compagny présentes.
| | | |-type        : string[] (un tableau de chaines de caractères)
| | | |-required    : true
| | | |-fields      : 
| | | -----------------------------
| | |-*category*
| | | |-description : Toutes les category présentes.
| | | |-type        : string[] (un tableau de chaines de caractères)
| | | |-required    : true
| | | |-fields      : 
| | | -----------------------------
| | |-*nbItem*
| | | |-description : Le nombre d'item total.
| | | |-type        : number (Un nombre quelquonque (entier ou à virgule))
| | | |-required    : true
| | | |-fields      : 
