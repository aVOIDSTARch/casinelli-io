/**
 * Homepage Style Builder
 * Parses homepage.css and returns complete PageStylesModule
 */

import type { PageStylesModule } from '../types';
import { parseCSS } from '../cssParser';
import { homepageDefaults, navCardDefaults, createStyleWithFallback } from '../defaults';

// Import CSS as raw string (Vite feature)
import homepageCSS from '~/styles/homepage.css?raw';

/**
 * Build complete styles for the Homepage
 * Returns ALL StylesKV collections needed for every component
 */
export function buildHomepageStyles(): PageStylesModule {
  const parsed = parseCSS(homepageCSS, 'homepage');
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
