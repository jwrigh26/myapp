import { expect, test } from "vitest";
import {
  isPalindromeBeginner,
  isPalindromeIterative,
  isPalidrome,
  isPalindromeIterativePlus,
} from "./palindromes";

test("isPalindromePlus function", () => {
  // Test palindrome strings
  expect(isPalidrome("racecar")).toBe(true);
  expect(isPalidrome("madam")).toBe(true);
  expect(isPalidrome("a")).toBe(true);
  expect(isPalidrome("")).toBe(true);
  expect(isPalidrome("11211")).toBe(true);

  // Test non-palindrome strings
  expect(isPalidrome("hello")).toBe(false);
  expect(isPalidrome("world")).toBe(false);
  expect(isPalidrome("palindrome")).toBe(false);

  // Test even-length palindromes
  expect(isPalidrome("abba")).toBe(true);
  expect(isPalidrome("1221")).toBe(true);

  // Test longer palindromes
  expect(isPalidrome("amanaplanacanalpanama")).toBe(true);
  expect(isPalidrome("abcdefggfedcba")).toBe(true);

  // Test non-string inputs
  expect(() => isPalidrome(12321)).toThrow(TypeError);
  expect(() => isPalidrome(null)).toThrow(TypeError);
  expect(() => isPalidrome(undefined)).toThrow(TypeError);
  expect(() => isPalidrome({})).toThrow(TypeError);
  expect(() => isPalidrome([])).toThrow(TypeError);
});

test("isPalindromeIterativePlus function", () => {
  // Test palindrome strings
  expect(isPalindromeIterativePlus("racecar")).toBe(true);
  expect(isPalindromeIterativePlus("madam")).toBe(true);
  expect(isPalindromeIterativePlus("a")).toBe(true);
  expect(isPalindromeIterativePlus("")).toBe(true);
  expect(isPalindromeIterativePlus("11211")).toBe(true);

  // Test non-palindrome strings
  expect(isPalindromeIterativePlus("hello")).toBe(false);
  expect(isPalindromeIterativePlus("world")).toBe(false);
  expect(isPalindromeIterativePlus("palindrome")).toBe(false);

  // Test even-length palindromes
  expect(isPalindromeIterativePlus("abba")).toBe(true);
  expect(isPalindromeIterativePlus("1221")).toBe(true);

  // Test longer palindromes
  expect(isPalindromeIterativePlus("amanaplanacanalpanama")).toBe(true);
  expect(isPalindromeIterativePlus("abcdefggfedcba")).toBe(true);

  // Test non-string inputs
  expect(() => isPalindromeIterativePlus(12321)).toThrow(TypeError);
  expect(() => isPalindromeIterativePlus(null)).toThrow(TypeError);
  expect(() => isPalindromeIterativePlus(undefined)).toThrow(TypeError);
  expect(() => isPalindromeIterativePlus({})).toThrow(TypeError);
  expect(() => isPalindromeIterativePlus([])).toThrow(TypeError);
});

test("isPalindrome function", () => {
  // Test palindrome strings
  expect(isPalindromeBeginner("racecar")).toBe(true);
  expect(isPalindromeBeginner("madam")).toBe(true);
  expect(isPalindromeBeginner("a")).toBe(true);
  expect(isPalindromeBeginner("")).toBe(true);
  expect(isPalindromeBeginner("11211")).toBe(true);

  // Test non-palindrome strings
  expect(isPalindromeBeginner("hello")).toBe(false);
  expect(isPalindromeBeginner("world")).toBe(false);
  expect(isPalindromeBeginner("palindrome")).toBe(false);

  // Test even-length palindromes
  expect(isPalindromeBeginner("abba")).toBe(true);
  expect(isPalindromeBeginner("1221")).toBe(true);

  // Test non-string inputs
  expect(() => isPalindromeBeginner(12321)).toThrow(TypeError);
  expect(() => isPalindromeBeginner(null)).toThrow(TypeError);
  expect(() => isPalindromeBeginner(undefined)).toThrow(TypeError);
  expect(() => isPalindromeBeginner({})).toThrow(TypeError);
  expect(() => isPalindromeBeginner([])).toThrow(TypeError);
});

test("isPalindromeIterative function", () => {
  // Test palindrome strings
  expect(isPalindromeIterative("racecar")).toBe(true);
  expect(isPalindromeIterative("madam")).toBe(true);
  expect(isPalindromeIterative("a")).toBe(true);
  expect(isPalindromeIterative("")).toBe(true);
  expect(isPalindromeIterative("11211")).toBe(true);

  // Test non-palindrome strings
  expect(isPalindromeIterative("hello")).toBe(false);
  expect(isPalindromeIterative("world")).toBe(false);
  expect(isPalindromeIterative("palindrome")).toBe(false);

  // Test even-length palindromes
  expect(isPalindromeIterative("abba")).toBe(true);
  expect(isPalindromeIterative("1221")).toBe(true);

  // Test non-string inputs
  expect(() => isPalindromeIterative(12321)).toThrow(TypeError);
  expect(() => isPalindromeIterative(null)).toThrow(TypeError);
  expect(() => isPalindromeIterative(undefined)).toThrow(TypeError);
  expect(() => isPalindromeIterative({})).toThrow(TypeError);
  expect(() => isPalindromeIterative([])).toThrow(TypeError);
});
