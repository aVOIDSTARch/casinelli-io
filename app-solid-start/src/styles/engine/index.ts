/**
 * Styling Engine
 * Main entry point for getting page styles
 *
 * Usage:
 * import { getPageStyles, PageName, type PageStylesModule } from '~/styles/engine';
 * const styles: PageStylesModule = getPageStyles(PageName.HOMEPAGE);
 */

import {
  PageName,
  type PageStylesModule,
  type NavCardStylesSet,
  type NavCardSectionStyles,
  type SectionStyles,
  type StylesKV,
} from './types';
import {
  buildHomepageStyles,
  buildAppsStyles,
  buildBlogStyles,
  buildMissionStyles,
} from './pageBuilders';

// Builder registry - maps page names to their builders
const builders: Record<PageName, () => PageStylesModule> = {
  [PageName.HOMEPAGE]: buildHomepageStyles,
  [PageName.APPS]: buildAppsStyles,
  [PageName.BLOG]: buildBlogStyles,
  [PageName.MISSION]: buildMissionStyles,
};

/**
 * Get complete styles for a page by name
 * Returns ALL StylesKV collections needed for every component on that page
 *
 * @param pageName - The PageName enum value
 * @returns Complete PageStylesModule with all StylesKV collections
 */
export function getPageStyles(pageName: PageName): PageStylesModule {
  const builder = builders[pageName];
  if (!builder) {
    throw new Error(`No style builder found for page: ${pageName}`);
  }
  return builder();
}

// Re-export types and enums
export { PageName };
export type {
  PageStylesModule,
  NavCardStylesSet,
  NavCardSectionStyles,
  SectionStyles,
  StylesKV,
};
