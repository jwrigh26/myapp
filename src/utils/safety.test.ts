import { describe, expect, it } from "vitest";
import {
  hasValue,
  isDate,
  isEmpty,
  isFunction,
  isNil,
  isNumeric,
  isObject,
  isString,
  isValidSearchParam,
  trimSpaces,
} from "./safety";
import { sleep } from "./utils";

describe("safety.ts", () => {
  it("sleep should delay execution", async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  it("hasValue should return true for non-empty values", () => {
    expect(hasValue("hello")).toBe(true);
    expect(hasValue(123)).toBe(true);
    expect(hasValue([1, 2, 3])).toBe(true);
    expect(hasValue({ key: "value" })).toBe(true);
    expect(hasValue(new Date())).toBe(true);
  });

  it("hasValue should return false for empty values", () => {
    expect(hasValue("")).toBe(false);
    expect(hasValue(null)).toBe(false);
    expect(hasValue(undefined)).toBe(false);
    expect(hasValue([])).toBe(false);
    expect(hasValue({})).toBe(false);
  });

  it("isEmpty should return true for empty objects and arrays", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
  });

  it("isEmpty should return false for non-empty objects and arrays", () => {
    expect(isEmpty({ key: "value" })).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it("isNil should return true for null and undefined", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it("isNil should return false for non-null and non-undefined values", () => {
    expect(isNil("hello")).toBe(false);
    expect(isNil(123)).toBe(false);
  });

  it("isFunction should return true for functions", () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it("isFunction should return false for non-functions", () => {
    expect(isFunction("hello")).toBe(false);
    expect(isFunction(123)).toBe(false);
  });

  it("isNumeric should return true for numeric values", () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric("123")).toBe(true);
  });

  it("isNumeric should return false for non-numeric values", () => {
    expect(isNumeric("hello")).toBe(false);
    expect(isNumeric({})).toBe(false);
  });

  it("isObject should return true for objects", () => {
    expect(isObject({})).toBe(true);
  });

  it("isObject should return false for non-objects", () => {
    expect(isObject("hello")).toBe(false);
    expect(isObject(123)).toBe(false);
  });

  it("isString should return true for strings", () => {
    expect(isString("hello")).toBe(true);
  });

  it("isString should return false for non-strings", () => {
    expect(isString(123)).toBe(false);
  });

  it("trimSpaces should trim spaces from strings", () => {
    expect(trimSpaces("  hello  ")).toBe("hello");
  });

  it("trimSpaces should return non-string values unchanged", () => {
    expect(trimSpaces(123)).toBe(123);
  });

  it("isDate should return true for valid dates", () => {
    expect(isDate(new Date())).toBe(true);
  });

  it("isDate should return false for invalid dates", () => {
    expect(isDate("hello")).toBe(false);
    expect(isDate(null)).toBe(false);
  });

  it("isValidSearchParam should return true for valid search params", () => {
    expect(isValidSearchParam("hello")).toBe(true);
    expect(isValidSearchParam(123)).toBe(true);
  });

  it("isValidSearchParam should return false for invalid search params", () => {
    expect(isValidSearchParam(undefined)).toBe(false);
    expect(isValidSearchParam(null)).toBe(false);
    expect(isValidSearchParam("undefined")).toBe(false);
    expect(isValidSearchParam("null")).toBe(false);
  });
});
