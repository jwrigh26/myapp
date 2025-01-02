// TypeScript version of the file with improvements and type annotations

export function hasValue(value: unknown): boolean {
  if (value === window) {
    return !isNil(value);
  }

  if (isDate(value)) {
    return true;
  }

  if (isObject(value) || Array.isArray(value)) {
    return !isEmpty(value);
  }

  if (isString(value)) {
    if (typeof value !== "string") {
      return false;
    }
    const isEmptyString = !value || value.trim().length === 0;
    const isUndefinedString = value === "undefined" || value === "null";
    return !isEmptyString && !isUndefinedString;
  }

  if (isNumeric(value)) {
    return true;
  }

  return false;
}

export const isEmpty = (obj: unknown): boolean => {
  if ([Object, Array].includes((obj as any)?.constructor)) {
    return !Object.entries(obj ?? {}).length;
  }
  return obj ? Object.keys(obj).length === 0 : true;
};

export function isNil(value: unknown): boolean {
  return value == null;
}

export function isFunction(func: unknown): func is Function {
  return typeof func === "function";
}

export function isNumeric(num: unknown): boolean {
  if (typeof num === "number") {
    return !Number.isNaN(num) && Number.isFinite(num);
  }
  if (typeof num === "string") {
    return !Number.isNaN(parseFloat(num)) && Number.isFinite(+num);
  }
  return false;
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj?.constructor === Object;
}

export function isString(str: unknown): str is string {
  return typeof str === "string" || str instanceof String;
}

export function trimSpaces(value: unknown): string | unknown {
  return isString(value) ? value.trim() : value;
}

export function isDate(value: unknown): value is Date {
  return (
    !isNil(value) && value instanceof Date && !Number.isNaN(value.valueOf())
  );
}

export function isValidSearchParam(value: unknown): boolean {
  return (
    value !== undefined &&
    value !== "undefined" &&
    value !== null &&
    value !== "null"
  );
}
