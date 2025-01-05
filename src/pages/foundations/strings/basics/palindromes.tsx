import PageLayout from "layouts/PageLayout";
import ProseBlock from "components/ProseBlock";
import TitleBlock from "components/TitleBlock";
import CodeBlock from "components/CodeBlock";
import Box from "@mui/material/Box";

// # introduction
// # explanation
// # Types of LeetCode Problems associated with Palindromes

// # examples

export default function Foo() {
  return (
    <PageLayout>
      <TitleBlock subtitle="A word, phrase, or sequence that reads the same backward as forward">
        Palindromes
      </TitleBlock>
      {/* Introduction */}
      <Box>
        <ProseBlock
          title="Tacocat"
          subtitle="A Fun Example of a palindrome by the creator of The Oatmeal"
        >
          Sure, words like <b>racecar</b> or <b>madam</b> also count, but they
          are not as fun to say as <b>Tacocat</b>.
        </ProseBlock>
        <ProseBlock dense>
          Palidromes are a popular subject in alogrithmic learning because they
          can be used in a varity of fundamental programming concepts like
          string manipulation, recursion, and the two-pointer technique.
        </ProseBlock>
        <ProseBlock dense subtitle="Types of Palindrome Problems">
          <ul>
            <li>Valid Palindrome</li>
            <li>Palindrome Number</li>
            <li>Shortest Palindrome</li>
            <li>Palidromic Substrings</li>
            <li>Longest Palidromic Substring</li>
            <li>Palindrome Partitioning</li>
          </ul>
        </ProseBlock>
      </Box>
      <ProseBlock title="Recursive Approach">
        <ul>
          <li>Pros: elegant, intutitive for small strings</li>
          <li>Cons: potential stack overflow for large strings</li>
        </ul>
        <CodeBlock code={codeIsPalindromeRecursive} language="javascript" />
      </ProseBlock>
      <ProseBlock title="Iterative Approach">
        <ul>
          <li>Pros: efficient, no extra memory</li>
          <li>Cons: less intuitive, more code</li>
        </ul>
        <CodeBlock code={codeIsPalindromeIterative} language="javascript" />
      </ProseBlock>
    </PageLayout>
  );
}

// ####################
// ### Code Blocks ###
// ####################

const codeIsPalindromeRecursive = `
function isPalidrome(str, left = 0, right = str.length - 1) {
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
`;

const codeIsPalindromeIterative = `
function isPalindromeIterative(str) {
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
`;
