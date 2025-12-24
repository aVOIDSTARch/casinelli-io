/**
 * Homepage Style Builder
 * Parses homepage.css + common.css and returns complete PageStylesModule
 */

import type { PageStylesModule } from '../types';
import { parseCSSMultiple } from '../cssParser';
import { homepageDefaults, navCardDefaults, createStyleWithFallback } from '../defaults';

// Import CSS as raw strings (Vite feature)
import homepageCSS from '~/styles/homepage.css?raw';
import commonCSS from '~/styles/common.css?raw';

/**
 * Build complete styles for the Homepage
 * Returns ALL StylesKV collections needed for every component
 */
export function buildHomepageStyles(): PageStylesModule {
  // Parse both page-specific and common CSS
  const parsed = parseCSSMultiple([homepageCSS, commonCSS], 'homepage');
  const classes: Set<string> = parsed.classNames;

  return {
    page: createStyleWithFallback(classes, 'homepage', homepageDefaults.page),
    header: createStyleWithFallback(classes, 'home-header', homepageDefaults.header),
    title: createStyleWithFallback(classes, 'home-title', homepageDefaults.title),
    sections: {
      appsNav: {
        container: createStyleWithFallback(
          classes,
          'apps-nav-section',
          homepageDefaults.sections.appsNav.container
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
    footer: createStyleWithFallback(classes, 'home-footer', homepageDefaults.footer),
  };
}
