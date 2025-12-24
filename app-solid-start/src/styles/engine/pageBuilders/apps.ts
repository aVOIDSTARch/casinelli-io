/**
 * Apps Page Style Builder
 * Parses apps.css and returns complete PageStylesModule
 */

import type { PageStylesModule } from '../types';
import { parseCSSMultiple } from '../cssParser';
import { navCardDefaults, createStyleWithFallback } from '../defaults';

// Import CSS as raw strings (Vite feature)
import appsCSS from '~/styles/apps.css?raw';
import commonCSS from '~/styles/common.css?raw';

// Default styles for apps page
const appsDefaults: PageStylesModule = {
  page: { 'apps-page': true },
  header: { 'apps-header': true },
  title: { 'apps-title': true },
  sections: {
    content: {
      container: { 'apps-content-section': true },
      navCardSection: {
        navAreaStyles: { 'nav-card-section': true },
        navCardStylesSet: navCardDefaults,
      },
    },
  },
  footer: { 'apps-footer': true },
};

/**
 * Build complete styles for the Apps page
 */
export function buildAppsStyles(): PageStylesModule {
  // Parse both page-specific and common CSS
  const parsed = parseCSSMultiple([appsCSS, commonCSS], 'apps');
  const classes: Set<string> = parsed.classNames;

  return {
    page: createStyleWithFallback(classes, 'apps-page', appsDefaults.page),
    header: createStyleWithFallback(classes, 'apps-header', appsDefaults.header),
    title: createStyleWithFallback(classes, 'apps-title', appsDefaults.title),
    sections: {
      content: {
        container: createStyleWithFallback(
          classes,
          'apps-content-section',
          appsDefaults.sections.content.container
        ),
        navCardSection: {
          navAreaStyles: createStyleWithFallback(
            classes,
            'nav-card-section',
            { 'nav-card-section': true }
          ),
          navCardStylesSet: {
            navCardStyles: createStyleWithFallback(
              classes,
              'nav-card',
              navCardDefaults.navCardStyles
            ),
            buttonStyles: createStyleWithFallback(
              classes,
              'nav-card-link',
              navCardDefaults.buttonStyles
            ),
            paraStyles: createStyleWithFallback(
              classes,
              'nav-card-para',
              navCardDefaults.paraStyles
            ),
          },
        },
      },
    },
    footer: createStyleWithFallback(classes, 'apps-footer', appsDefaults.footer),
  };
}
