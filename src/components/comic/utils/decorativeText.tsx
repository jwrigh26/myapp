import React, { Fragment } from 'react';
import type { BubbleSpec } from '../types';

/**
 * Applies decorative text styling to bubble text based on decorativeText rules
 */
export function applyDecorativeText(
  text: string,
  decorativeRules?: BubbleSpec['decorativeText']
): React.ReactNode {
  if (!decorativeRules || decorativeRules.length === 0) {
    return text;
  }

  // Apply all rules in a single pass to avoid React node traversal complexity
  return applyAllRulesToString(text, decorativeRules);
}

/**
 * Applies all decorative rules to a string in a single pass
 */
function applyAllRulesToString(
  text: string,
  decorativeRules: NonNullable<BubbleSpec['decorativeText']>
): React.ReactNode {
  // Separate rules by type
  const firstLetterRule = decorativeRules.find(
    (rule) => rule.type === 'first-letter'
  );
  const searchReplaceRules = decorativeRules.filter(
    (rule) => rule.type === 'search-replace'
  );
  const symbolReplaceRules = decorativeRules.filter(
    (rule) => rule.type === 'symbol-replace'
  );

  // Start with the original text
  let result: React.ReactNode = text;

  // Apply first-letter rule first (if exists)
  if (firstLetterRule && text.length > 0) {
    const firstChar = text.charAt(0);
    const restOfText = text.slice(1);

    result = (
      <Fragment key="first-letter">
        <span className={firstLetterRule.className}>{firstChar}</span>
        {restOfText}
      </Fragment>
    );
  }

  // Apply search-replace and symbol-replace rules to the remaining text
  const allTextRules = [...searchReplaceRules, ...symbolReplaceRules];
  if (allTextRules.length > 0) {
    const textToProcess = firstLetterRule ? text.slice(1) : text;
    // Filter out rules without searchText and ensure type safety
    const validRules = allTextRules.filter(
      (
        rule
      ): rule is
        | { type: 'search-replace'; className: string; searchText: string }
        | {
            type: 'symbol-replace';
            className: string;
            searchText: string;
            symbolText?: string;
          } => Boolean(rule.searchText)
    );

    if (validRules.length > 0) {
      const processedText = applyMultipleTextReplace(textToProcess, validRules);

      if (firstLetterRule) {
        const firstChar = text.charAt(0);
        result = (
          <Fragment key="combined">
            <span className={firstLetterRule.className}>{firstChar}</span>
            {processedText}
          </Fragment>
        );
      } else {
        result = processedText;
      }
    }
  }

  return result;
}

/**
 * Applies multiple text replacement rules (search-replace and symbol-replace)
 */
function applyMultipleTextReplace(
  text: string,
  textRules: Array<
    | { type: 'search-replace'; className: string; searchText: string }
    | {
        type: 'symbol-replace';
        className: string;
        searchText: string;
        symbolText?: string;
      }
  >
): React.ReactNode {
  if (textRules.length === 0) return text;

  // Build a single regex that captures all search terms
  const searchTerms = textRules
    .map((rule) => rule.searchText)
    .filter(Boolean)
    .map(escapeRegExp);

  if (searchTerms.length === 0) return text;

  const combinedRegex = new RegExp(`(${searchTerms.join('|')})`, 'gi');
  const parts = text.split(combinedRegex);

  return (
    <Fragment key="text-replace">
      {parts.map((part, index) => {
        // Find which rule matches this part
        const matchingRule = textRules.find(
          (rule) =>
            rule.searchText &&
            part.toLowerCase() === rule.searchText.toLowerCase()
        );

        if (matchingRule) {
          // For symbol-replace, use symbolText or default symbols
          const displayText =
            matchingRule.type === 'symbol-replace'
              ? matchingRule.symbolText ||
                getDefaultSymbols(matchingRule.searchText)
              : part;

          return (
            <span key={index} className={matchingRule.className}>
              {displayText}
            </span>
          );
        }

        return part;
      })}
    </Fragment>
  );
}

/**
 * Gets default comic symbols for common expletives
 */
function getDefaultSymbols(word: string): string {
  const symbolMap: Record<string, string> = {
    damn: '@#$%',
    hell: '#@!!',
    crap: '$#!†',
    darn: '@#*!',
    shit: '$#!†',
    fuck: '#@$%',
    ass: '@$$',
  };

  return symbolMap[word.toLowerCase()] || '@#$%';
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
