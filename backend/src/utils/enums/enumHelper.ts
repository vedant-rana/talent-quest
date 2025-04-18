import { DropDownListItem } from "../../types/commonTypes.js";

export function stringToEnum<T extends Record<string, string>>(
  enumObj: T,
  value: string
): T[keyof T] | undefined {
  if (Object.values(enumObj).includes(value as T[keyof T])) {
    return value as T[keyof T];
  }
  return undefined;
}

export function getEnumValues<T extends Record<string, string | number>>(
  enumObj: T
): T[keyof T][] {
  return Object.values(enumObj) as T[keyof T][];
}

export function enumToDropDownList<T extends Record<string, string | number>>(
  enumObj: T
): DropDownListItem[] {
  return Object.entries(enumObj).map(([key, value]) => ({
    text: key,
    value,
  }));
}
