import type { HomeHeaderProps } from './HomeHeader';
import type { HomeTitleProps } from './HomeTitle';
import type { AppsNavSectionProps } from './AppsNavSection';
import type { HomeFooterProps } from './HomeFooter';
import type { PageProperties } from '~/types/PageProperties';
import type { NavCardProps } from './NavCard';
import { getPageStyles,  PageName } from '~/styles/engine';

// Get styles from the engine
const styles = getPageStyles(PageName.HOMEPAGE);
const navCardStylesSet = styles.sections.appsNav.navCardSection!.navCardStylesSet;

// Page metadata
export const testPageProps: PageProperties = {
  title: 'Home | Casinelli.io',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1',
  lang: 'en',
  description: 'Welcome to Casinelli.io - Apps, Blog, and More',
};

// Header props
export const testHeaderProps: HomeHeaderProps = {
  text: '',
  stylesKV: styles.header,
};

// Title props
export const testTitleProps: HomeTitleProps = {
  title: 'casinelli.io',
  stylesKV: styles.title,
};

// App navigation cards (content only, styles from engine)
const appNavCards: NavCardProps[] = [
  {
    key: 0,
    buttonText: 'Color',
    paraText: 'Color utility tools',
    url: '/apps/color',
    navCardStylesSet,
  },
  {
    key: 1,
    buttonText: 'Jayson',
    paraText: 'JSON utility tools',
    url: '/apps/jayson',
    navCardStylesSet,
  },
  {
    key: 2,
    buttonText: 'Theme UI',
    paraText: 'Theme builder and previewer',
    url: '/apps/theme-ui',
    navCardStylesSet,
  },
];

export const testAppsNavSectionProps: AppsNavSectionProps = {
  title: 'Apps',
  stylesKV: styles.sections.appsNav.container,
  navCardSectionProps: {
    navAreaStyles: styles.sections.appsNav.navCardSection!.navAreaStyles,
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
    navCardStylesSet,
  },
  {
    key: 1,
    buttonText: 'Mission',
    paraText: 'Our purpose and goals',
    url: '/mission',
    navCardStylesSet,
  },
];

export const testFooterProps: HomeFooterProps = {
  text: '',
  stylesKV: styles.footer,
  navCardSectionProps: {
    navAreaStyles: styles.sections.appsNav.navCardSection!.navAreaStyles,
    navCardPropsSet: footerNavCards,
  },
};

// Combined export for easy use
export const testHomePageProps = {
  pageProps: testPageProps,
  mainDivStylesKV: styles.page,
  headerProps: testHeaderProps,
  titleProps: testTitleProps,
  appsNavSectionProps: testAppsNavSectionProps,
  footerProps: testFooterProps,
};
