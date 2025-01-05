export function isPalindromeBeginner(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  // Base case: a string of length 0 or 1 is a palindrome
  if (str.length <= 1) {
    return true;
  }

  // Check if the first and last characters are the same
  if (str[0] !== str[str.length - 1]) {
    return false;
  }

  // Recursive case: Check the substring without the first and last characters
  return isPalindromeBeginner(str.slice(1, -1));
}

export function isPalindromeIterative(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}


// ### With Pointers
export function isPalidrome(str, left = 0, right = str.length - 1) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  // Base case: If pointers have crossed, it's a palindrome
  if (left >= right) {
    return true;
  }

  // Check if characters at the pointers are the same
  if (str[left] !== str[right]) {
    return false;
  }

  // Recurse with the pointers moved inward
  return isPalidrome(str, left + 1, right - 1);
}

// ### With Pointers Iterative
export function isPalindromeIterativePlus(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

