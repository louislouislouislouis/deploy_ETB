import { TypeDescriptor } from "./base/TypeDescriptor";

export const VoidDescriptor : TypeDescriptor<void> = new TypeDescriptor<void>("void", "vide");
export const StringDescriptor : TypeDescriptor<string> = new TypeDescriptor<string>("string", "Une chaine de caractères");
export const NumberDescriptor : TypeDescriptor<number> = new TypeDescriptor<number>("number", "Un nombre quelquonque (entier ou à virgule)");

export const StringArrayDescriptor : TypeDescriptor<string[]> = new TypeDescriptor<string[]>("string[]", "un tableau de chaines de caractères");

export const ObjectTypeDescriptor : TypeDescriptor<{[index: string]: string | number}> = new TypeDescriptor<{[index: string]: string | number}>("{[index: string]: string | number}", "Une map quelquonque contenant des clées string et des valeurs string ou nombres.");