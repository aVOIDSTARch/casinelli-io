/**
 * Blog Page Style Builder
 * Parses blog.css and returns complete PageStylesModule
 */

import type { PageStylesModule } from '../types';
import { parseCSS } from '../cssParser';
import { navCardDefaults, createStyleWithFallback } from '../defaults';

// Import CSS as raw string (Vite feature)
import blogCSS from '~/styles/blog.css?raw';

// Default styles for blog page
const blogDefaults: PageStylesModule = {
  page: { 'blog-page': true },
  header: { 'blog-header': true },
  title: { 'blog-title': true },
  sections: {
    content: {
      container: { 'blog-content-section': true },
      navCardSection: {
        navAreaStyles: { 'nav-card-section': true },
        navCardStylesSet: navCardDefaults,
      },
    },
  },
  footer: { 'blog-footer': true },
};

/**
 * Build complete styles for the Blog page
 */
export function buildBlogStyles(): PageStylesModule {
  const parsed = parseCSS(blogCSS, 'blog');
  const classes = parsed.classNames;

  return {
    page: createStyleWithFallback(classes, 'blog-page', blogDefaults.page),
    header: createStyleWithFallback(classes, 'blog-header', blogDefaults.header),
    title: createStyleWithFallback(classes, 'blog-title', blogDefaults.title),
    sections: {
      content: {
        container: createStyleWithFallback(
          classes,
          'blog-content-section',
          blogDefaults.sections.content.container
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
    footer: createStyleWithFallback(classes, 'blog-footer', blogDefaults.footer),
  };
}
