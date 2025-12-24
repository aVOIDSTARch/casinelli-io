/**
 * CSS Parser - Extracts class names from CSS content
 */

export interface ParsedCSS {
  classNames: Set<string>;
  rawContent: string;
}

// Cache for parsed CSS to avoid re-parsing
const parseCache = new Map<string, ParsedCSS>();

/**
 * Extract all CSS class names from a CSS string
 * Handles standard selectors, compound selectors, and nested rules
 */
export function parseCSS(cssContent: string, cacheKey?: string): ParsedCSS {
  // Check cache first
  if (cacheKey && parseCache.has(cacheKey)) {
    return parseCache.get(cacheKey)!;
  }

  // Remove comments
  const withoutComments = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');

  // Extract class names using regex
  // Matches .class-name patterns, handles compound selectors
  const classPattern = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
  const classNames = new Set<string>();

  let match;
  while ((match = classPattern.exec(withoutComments)) !== null) {
    classNames.add(match[1]);
  }

  const result: ParsedCSS = {
    classNames,
    rawContent: cssContent,
  };

  // Cache if key provided
  if (cacheKey) {
    parseCache.set(cacheKey, result);
  }

  return result;
}

/**
 * Check if a class name exists in parsed CSS
 */
export function hasClass(parsed: ParsedCSS, className: string): boolean {
  return parsed.classNames.has(className);
}

/**
 * Get all class names as an array
 */
export function getClassNames(parsed: ParsedCSS): string[] {
  return Array.from(parsed.classNames);
}

/**
 * Clear the parse cache
 */
export function clearParseCache(): void {
  parseCache.clear();
}
