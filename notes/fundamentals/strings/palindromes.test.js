import { expect, test } from "vitest";
import {
  isPalindrome,
  isPalindromeIterative,
  isPalindromePlus,
  isPalindromeIterativePlus,
} from "./palindromes";

test("isPalindromePlus function", () => {
  // Test palindrome strings
  expect(isPalindromePlus("racecar")).toBe(true);
  expect(isPalindromePlus("madam")).toBe(true);
  expect(isPalindromePlus("a")).toBe(true);
  expect(isPalindromePlus("")).toBe(true);
  expect(isPalindromePlus("11211")).toBe(true);

  // Test non-palindrome strings
  expect(isPalindromePlus("hello")).toBe(false);
  expect(isPalindromePlus("world")).toBe(false);
  expect(isPalindromePlus("palindrome")).toBe(false);

  // Test even-length palindromes
  expect(isPalindromePlus("abba")).toBe(true);
  expect(isPalindromePlus("1221")).toBe(true);

  // Test longer palindromes
  expect(isPalindromePlus("amanaplanacanalpanama")).toBe(true);
  expect(isPalindromePlus("abcdefggfedcba")).toBe(true);

  // Test non-string inputs
  expect(() => isPalindromePlus(12321)).toThrow(TypeError);
  expect(() => isPalindromePlus(null)).toThrow(TypeError);
  expect(() => isPalindromePlus(undefined)).toThrow(TypeError);
  expect(() => isPalindromePlus({})).toThrow(TypeError);
  expect(() => isPalindromePlus([])).toThrow(TypeError);
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
  expect(isPalindrome("racecar")).toBe(true);
  expect(isPalindrome("madam")).toBe(true);
  expect(isPalindrome("a")).toBe(true);
  expect(isPalindrome("")).toBe(true);
  expect(isPalindrome("11211")).toBe(true);

  // Test non-palindrome strings
  expect(isPalindrome("hello")).toBe(false);
  expect(isPalindrome("world")).toBe(false);
  expect(isPalindrome("palindrome")).toBe(false);

  // Test even-length palindromes
  expect(isPalindrome("abba")).toBe(true);
  expect(isPalindrome("1221")).toBe(true);

  // Test non-string inputs
  expect(() => isPalindrome(12321)).toThrow(TypeError);
  expect(() => isPalindrome(null)).toThrow(TypeError);
  expect(() => isPalindrome(undefined)).toThrow(TypeError);
  expect(() => isPalindrome({})).toThrow(TypeError);
  expect(() => isPalindrome([])).toThrow(TypeError);
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
