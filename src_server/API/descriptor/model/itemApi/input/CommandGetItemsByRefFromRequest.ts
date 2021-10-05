import * as safen from "safen"
import { TypeDescriptor } from "../../base/TypeDescriptor";

import { FieldDescriptor as fd } from "../../base/FieldDescriptor";
import { FieldDescriptorInput as fdInput } from "../../base/FieldDescriptorInput";
import { customMessages } from "../../../../inputChecker";
import { StringDescriptor } from "../../baseTypes";

/**
 * describe the command for the getItemById api
 */
export interface CommandGetItemsByRefFromRequest{
  ref:string;
}

const CommandGetItemsByRefFromRequestTypeDescriptor : TypeDescriptor<CommandGetItemsByRefFromRequest> = new TypeDescriptor<CommandGetItemsByRefFromRequest>(
  "CommandGetItemsByRefFromRequest",
  "Une demande d'items spécifique par reference."
);

export const CommandGetItemsByRefFromRequestDescriptor : fdInput<CommandGetItemsByRefFromRequest> = new fdInput<CommandGetItemsByRefFromRequest>(
  "CommandGetItemsByRefFromRequest",
  "une demande d'items spécifique par reference.",
  CommandGetItemsByRefFromRequestTypeDescriptor,
  true,
  safen.create(`{
      ref:string & length(4)
  }`, customMessages),
  new fd<string>(
    "ref",
    "la reference.",
    StringDescriptor
),
);
