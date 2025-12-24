/**
 * Default styles for fallback when CSS classes don't exist
 * Based on Skeleton CSS aesthetic (white bg, 1px borders)
 */

import type { StylesKV, NavCardStylesSet, PageStylesModule } from './types';

// Skeleton CSS utility defaults
export const skeletonDefaults = {
  container: { container: true } as StylesKV,
  button: { button: true } as StylesKV,
  row: { row: true } as StylesKV,
};

// NavCard component defaults
export const navCardDefaults: NavCardStylesSet = {
  navCardStyles: { 'nav-card': true },
  buttonStyles: { 'nav-card-link': true },
  paraStyles: { 'nav-card-para': true },
};

// Section defaults
export const sectionDefaults = {
  navCardSection: { 'nav-card-section': true } as StylesKV,
  appsNavSection: { 'apps-nav-section': true } as StylesKV,
};

// Page-level defaults
export const pageDefaults = {
  homepage: { homepage: true } as StylesKV,
  header: { 'home-header': true } as StylesKV,
  title: { 'home-title': true } as StylesKV,
  footer: { 'home-footer': true } as StylesKV,
};

/**
 * Complete default PageStylesModule
 * Used when no CSS is available or as base for merging
 */
export const defaultPageStyles: PageStylesModule = {
  page: { page: true },
  header: { header: true },
  title: { title: true },
  sections: {
    main: {
      container: { section: true },
      navCardSection: {
        navAreaStyles: { 'nav-card-section': true },
        navCardStylesSet: navCardDefaults,
      },
    },
  },
  footer: { footer: true },
};

/**
 * Homepage-specific defaults
 */
export const homepageDefaults: PageStylesModule = {
  page: { homepage: true },
  header: { 'home-header': true },
  title: { 'home-title': true },
  sections: {
    appsNav: {
      container: { 'apps-nav-section': true },
      navCardSection: {
        navAreaStyles: { 'nav-card-section': true },
        navCardStylesSet: navCardDefaults,
      },
    },
  },
  footer: { 'home-footer': true },
};

/**
 * Create a StylesKV with class if it exists, otherwise use fallback
 */
export function createStyleWithFallback(
  availableClasses: Set<string>,
  className: string,
  fallback: StylesKV
): StylesKV {
  if (availableClasses.has(className)) {
    return { [className]: true };
  }
  return { ...fallback };
}
