/**
 * Projects Page Style Builder
 */

import type { PageStylesModule } from '../types';
import { parseCSSMultiple } from '../cssParser';
import { navCardDefaults, createStyleWithFallback } from '../defaults';

import projectsCSS from '~/styles/projects.css?raw';
import commonCSS from '~/styles/common.css?raw';

const projectsDefaults: PageStylesModule = {
  page: { 'projects-page': true },
  header: { 'projects-header': true },
  title: { 'projects-title': true },
  sections: {
    content: {
      container: { 'projects-content': true },
      navCardSection: {
        navAreaStyles: { 'projects-grid': true },
        navCardStylesSet: navCardDefaults,
      },
    },
  },
  footer: { 'projects-footer': true },
};

export function buildProjectsStyles(): PageStylesModule {
  const parsed = parseCSSMultiple([projectsCSS, commonCSS], 'projects');
  const classes: Set<string> = parsed.classNames;

  return {
    page: createStyleWithFallback(classes, 'projects-page', projectsDefaults.page),
    header: createStyleWithFallback(classes, 'projects-header', projectsDefaults.header),
    title: createStyleWithFallback(classes, 'projects-title', projectsDefaults.title),
    sections: {
      content: {
        container: createStyleWithFallback(
          classes,
          'projects-content',
          projectsDefaults.sections.content.container
        ),
        navCardSection: {
          navAreaStyles: createStyleWithFallback(
            classes,
            'projects-grid',
            { 'projects-grid': true }
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
    footer: createStyleWithFallback(classes, 'projects-footer', projectsDefaults.footer),
  };
}
