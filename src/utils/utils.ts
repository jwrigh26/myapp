import type { Theme } from '@mui/material/styles';

export function getValueByName<T>(
  args: Array<{ name: string; value: T }>,
  name: string
): T | undefined {
  const arg = args.find((arg) => arg.name === name);
  return arg?.value;
}

export const _get = (obj: any, path: string, defaultValue: any): any => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res: any, key: string) => (res != null ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const _padStart = (
  string: string | number,
  length: number,
  pad: string
): string => {
  const s = String(string);
  if (!s || s.length >= length) return s;
  return `${Array(length + 1 - s.length).join(pad)}${s}`;
};

export const _sortBy = <T>(
  collection: T[],
  iteratees: Array<(item: T) => any>
): T[] => {
  const result = [...collection];
  result.sort((a, b) => {
    for (const iteratee of iteratees) {
      const aValue = iteratee(a);
      const bValue = iteratee(b);

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    }
    return 0;
  });
  return result;
};

export const _isRegExp = (value: unknown): value is RegExp => {
  return Object.prototype.toString.call(value) === '[object RegExp]';
};

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// utils/themeColor.ts

/** Accepts tokens like "primary.main", "secondary.dark", "text.secondary",
 *  or a raw CSS color ("#123", "rgb(...)", "hsl(...)", "rebeccapurple"). */
export const resolveThemeColor = (value?: string) => (theme: Theme): string | undefined => {
  if (!value) return undefined;

  // If it's already a CSS color, just return it.
  if (/^#|^rgb|^hsl|^var\(|^[a-z]+$/i.test(value)) return value;

  // Generic dot-path resolver: "palette.primary.main" or "primary.main"
  const path = value.startsWith('palette.') ? value : `palette.${value}`;
  const resolved = path.split('.').reduce<any>((obj, key) => (obj ? obj[key] : undefined), theme);

  return typeof resolved === 'string' ? resolved : undefined;
}
