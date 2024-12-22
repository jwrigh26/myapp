function isPalindrome(str) {
  // Base case: a string of length 0 or 1 is a palindrome
  if (str.length <= 1) {
    return true;
  }

  // Check if the first and last characters are the same
  if (str[0] !== str[str.length - 1]) {
    return false;
  }

  // Recursive case: Check the substring without the first and last characters
  return isPalindrome(str.slice(1, -1));
}

// Example usage
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("madam"));   // true
