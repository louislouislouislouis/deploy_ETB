import { RouteDescriptor, RouteType } from "../base/RouteDescriptor";
import { VoidInputDescriptor } from "../baseFields";
import { CommandSearchFromRequest, CommandSearchFromRequestDescriptor } from "./input/CommandSearchFromRequest";
import { CommandGetItemsByRefFromRequest, CommandGetItemsByRefFromRequestDescriptor} from "./input/CommandGetItemsByRefFromRequest";

import {GetItemsByRefResult, GetItemsByRefResultDescriptor} from "./output/GetItemsByRefResult"
import { GetStatsResult, GetStatsResultDescriptor } from "./output/GetStats";
import { SearchResult, SearchResultDescriptor } from "./output/SearchResult";


///////////////////////////////////////////////////////////////////
// search
//////////////////////////////////////////////////////////////////
export const searchRouteDescriptor : RouteDescriptor<CommandSearchFromRequest, SearchResult> = new RouteDescriptor<CommandSearchFromRequest, SearchResult>(
    "api/search",
    "search",
    RouteType.POST,
    "Effectu une recherche sur la base de données et essaye de renvoyer les items pouvant correspondres.",
    CommandSearchFromRequestDescriptor,
    SearchResultDescriptor
);

export const getItemByRefRouteDescriptor : RouteDescriptor<CommandGetItemsByRefFromRequest, GetItemsByRefResult> = new RouteDescriptor<CommandGetItemsByRefFromRequest, GetItemsByRefResult>(
    "api/itemsByRef",
    "itemByRef",
    RouteType.POST,
    "Effectu une recherche sur la base de données et renvois les items correspondant à la reference, si il n'y en a pas, renvois null.",
    CommandGetItemsByRefFromRequestDescriptor,
    GetItemsByRefResultDescriptor
);

export const GetStatsRouteDescriptor : RouteDescriptor<void, GetStatsResult> = new RouteDescriptor<void, GetStatsResult>(
    "api/stats",
    "stats",
    RouteType.POST,
    "Genere des stats divers a partir de la base de données.",
    VoidInputDescriptor,
    GetStatsResultDescriptor
);