import type { HomeHeaderProps } from './HomeHeader';
import type { TitleProps } from './HomeTitle';
import type { AppsNavSectionProps } from './AppsNavSection';
import type { HomeFooterProps } from './HomeFooter';
import type { PageProperties } from '~/types/PageProperties';
import type { NavCardProps, NavCardStylesSet } from './NavCard';
import type { StylesKV } from '~/utils/stylesKV';

// Shared styles for nav cards
const defaultNavCardStylesSet: NavCardStylesSet = {
  navCardStyles: { 'nav-card': true },
  buttonStyles: { 'nav-card-link': true },
  paraStyles: { 'nav-card-para': true },
};

// Page metadata
export const testPageProps: PageProperties = {
  title: 'Home | Casinelli.io',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1',
  lang: 'en',
  description: 'Welcome to Casinelli.io - Apps, Blog, and More',
};

// Main container styles
export const testMainDivStylesKV: StylesKV = { homepage: true };

// Header props
export const testHeaderProps: HomeHeaderProps = {
  text: '',
  stylesKV: { 'home-header': true },
};

// Title props
export const testTitleProps: TitleProps = {
  title: 'casinelli.io',
  stylesKV: { 'home-title': true },
};

// App navigation cards
const appNavCards: NavCardProps[] = [
  {
    key: 0,
    buttonText: 'Color',
    paraText: 'Color utility tools',
    url: '/apps/color',
    navCardStylesSet: defaultNavCardStylesSet,
  },
  {
    key: 1,
    buttonText: 'Jayson',
    paraText: 'JSON utility tools',
    url: '/apps/jayson',
    navCardStylesSet: defaultNavCardStylesSet,
  },
  {
    key: 2,
    buttonText: 'Theme UI',
    paraText: 'Theme builder and previewer',
    url: '/apps/theme-ui',
    navCardStylesSet: defaultNavCardStylesSet,
  },
];

export const testAppsNavSectionProps: AppsNavSectionProps = {
  title: 'Apps',
  stylesKV: { 'apps-nav-section': true },
  navCardSectionProps: {
    navAreaStyles: { 'nav-card-section': true },
    navCardPropsSet: appNavCards,
  },
};

// Footer navigation cards
const footerNavCards: NavCardProps[] = [
  {
    key: 0,
    buttonText: 'Blog',
    paraText: 'Read the latest posts',
    url: '/blog',
    navCardStylesSet: defaultNavCardStylesSet,
  },
  {
    key: 1,
    buttonText: 'Mission',
    paraText: 'Our purpose and goals',
    url: '/mission',
    navCardStylesSet: defaultNavCardStylesSet,
  },
];

export const testFooterProps: HomeFooterProps = {
  text: '',
  stylesKV: { 'home-footer': true },
  navCardSectionProps: {
    navAreaStyles: { 'nav-card-section': true },
    navCardPropsSet: footerNavCards,
  },
};

// Combined export for easy use
export const testHomePageProps = {
  pageProps: testPageProps,
  mainDivStylesKV: testMainDivStylesKV,
  headerProps: testHeaderProps,
  titleProps: testTitleProps,
  appsNavSectionProps: testAppsNavSectionProps,
  footerProps: testFooterProps,
};
