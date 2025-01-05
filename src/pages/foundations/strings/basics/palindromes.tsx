import Typography from "@mui/material/Typography";
import PageLayout from "layouts/PageLayout";
import ProseBlock from "components/ProseBlock";
import TitleBlock from "components/TitleBlock";
import CodeBlock from "components/CodeBlock";

export default function Foo() {
  return (
    <PageLayout>
      <TitleBlock subtitle="A word, phrase, or sequence that reads the same backward as forward">
        Palindromes
      </TitleBlock>
      <ProseBlock title="Some" subtitle="placeholder">
        Some placeholder
      </ProseBlock>
      <CodeBlock code={codeIsPalindrome} language="javascript" />
    </PageLayout>
  );
}

// ####################
// ### Code Blocks ###
// ####################

const codeIsPalindrome = `
function isPalindrome(str) {
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
  return isPalindrome(str.slice(1, -1));
}
`;
