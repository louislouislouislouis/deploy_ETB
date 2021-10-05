import * as safen from "safen"

import { customMessages } from "../../inputChecker";
import { FieldDescriptor as fd } from "./base/FieldDescriptor";
import { FieldDescriptorInput as fdInput } from "./base/FieldDescriptorInput";
import { StringDescriptor, VoidDescriptor} from "./baseTypes";

export const UuidDescriptor : fd<string> = new fd<string>(
    "id",
    "Un id de base de donnees Mongo.",
    StringDescriptor,
    true
)

export const VoidInputDescriptor : fdInput<void> = new fdInput<void>(
    "void",
    "Un input vide.",
    VoidDescriptor,
    true,
    safen.create(`{
    }`, customMessages)
)