import { ApiDescriptor } from "../base/ApiDescriptor";
import { getItemByRefRouteDescriptor, GetStatsRouteDescriptor, searchRouteDescriptor } from "./schemas";

export const ItemApiDescriptor : ApiDescriptor = new ApiDescriptor(
    "ItemApi",
    "L'api de gestion des items.",
    searchRouteDescriptor,
    getItemByRefRouteDescriptor,
    GetStatsRouteDescriptor
);