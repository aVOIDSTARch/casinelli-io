/**
 * Mission Page Style Builder
 * Parses mission.css and returns complete PageStylesModule
 */

import type { PageStylesModule } from '../types';
import { parseCSS } from '../cssParser';
import { navCardDefaults, createStyleWithFallback } from '../defaults';

// Import CSS as raw string (Vite feature)
import missionCSS from '~/styles/mission.css?raw';

// Default styles for mission page
const missionDefaults: PageStylesModule = {
  page: { 'mission-page': true },
  header: { 'mission-header': true },
  title: { 'mission-title': true },
  sections: {
    content: {
      container: { 'mission-content-section': true },
      navCardSection: {
        navAreaStyles: { 'nav-card-section': true },
        navCardStylesSet: navCardDefaults,
      },
    },
  },
  footer: { 'mission-footer': true },
};

/**
 * Build complete styles for the Mission page
 */
export function buildMissionStyles(): PageStylesModule {
  const parsed = parseCSS(missionCSS, 'mission');
  const classes = parsed.classNames;

  return {
    page: createStyleWithFallback(classes, 'mission-page', missionDefaults.page),
    header: createStyleWithFallback(classes, 'mission-header', missionDefaults.header),
    title: createStyleWithFallback(classes, 'mission-title', missionDefaults.title),
    sections: {
      content: {
        container: createStyleWithFallback(
          classes,
          'mission-content-section',
          missionDefaults.sections.content.container
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
    footer: createStyleWithFallback(classes, 'mission-footer', missionDefaults.footer),
  };
}
