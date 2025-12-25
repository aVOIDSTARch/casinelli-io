// This Module takes a homepage style sheet and creates all props, outputting a HomePageProps object

// Import the necessary modules
import type { HomePageProps } from './homePageIndex';
import type { PageProperties } from '~/types/PageProperties';
import type { AppsNavSectionProps } from './AppsNavSection';
import type { HomeFooterProps } from './HomeFooter';
import type { HomeTitleProps } from './HomeTitle';
import type { NavCardProps } from './NavCard';
import type { NavCardSectionProps } from './NavCardSection';
import type { HomeHeaderProps } from './HomeHeader';
import {
  getPageStyles,
  PageName,
  type PageStylesModule,
  type StylesKV,
  type NavCardStylesSet,
} from '~/styles/engine';

// Function to generate the props for the homepage components
export default function generateHomePageProps(): HomePageProps {
  // Get ALL styles from the engine in one call
  const styles: PageStylesModule = getPageStyles(PageName.HOMEPAGE);

  // Extract the navCardStylesSet from the styles object
  const navCardStylesSet: NavCardStylesSet =
    styles.sections.appsNav.navCardSection!.navCardStylesSet;

  /// Create the props ///

  // Create the props for the HomeHeader component
  const homeHeaderProps: HomeHeaderProps = {
    text: '',
    stylesKV: styles.header,
  };

  // Create the props for the HomeTitle component
  const homeTitleProps: HomeTitleProps = {
    title: 'casinelli.io',
    stylesKV: styles.title,
  };

  /// AppsNavSection ///

  // Create the props for the THREE NavCard components in the NavCardSection in the AppsNavSection
  const appsNavCardProps1: NavCardProps = {
    key: 0,
    buttonText: 'Color',
    paraText: 'Color utility tools',
    url: '/apps/color',
    navCardStylesSet,
    imageUrl: '/floral_176.png',
    imageAlt: 'Floral pattern',
    cardHoverColor: '#d9e0ed', // Light navy
    buttonHoverStyles: {
      hoverBg: '#d9e0ed',
      hoverColor: '#00296B', // Dark navy
      hoverBorder: '#8095b8',
    },
  };

  const appsNavCardProps2: NavCardProps = {
    key: 1,
    buttonText: 'Jayson',
    paraText: 'JSON utility tools',
    url: '/apps/jayson',
    navCardStylesSet,
    imageUrl: '/abstract_176.png',
    imageAlt: 'Abstract pattern',
    cardHoverColor: '#fef6d9', // Light gold
    buttonHoverStyles: {
      hoverBg: '#fef6d9',
      hoverColor: '#b38b00', // Dark gold
      hoverBorder: '#e6b300',
    },
  };

  const appsNavCardProps3: NavCardProps = {
    key: 2,
    buttonText: 'Theme UI',
    paraText: 'Theme builder and previewer',
    url: '/apps/theme-ui',
    navCardStylesSet,
    imageUrl: '/geometric_176.png',
    imageAlt: 'Geometric pattern',
    cardHoverColor: '#d9e4f0', // Light blue
    buttonHoverStyles: {
      hoverBg: '#d9e4f0',
      hoverColor: '#004E89', // Medium blue
      hoverBorder: '#6699bb',
    },
  };

  // Create the props for the NavCardSection component in the AppsNavSection
  const appsNavCardSectionProps: NavCardSectionProps = {
    navAreaStyles: styles.sections.appsNav.navCardSection!.navAreaStyles,
    navCardPropsSet: [appsNavCardProps1, appsNavCardProps2, appsNavCardProps3],
  };

  // Create the props for the AppsNavSection component
  const appsNavSectionProps: AppsNavSectionProps = {
    title: '',
    stylesKV: styles.sections.appsNav.container,
    navCardSectionProps: appsNavCardSectionProps,
  };

  /// Footer ///

  // Create the props for the TWO NavCard components in the NavCardSection in the HomeFooter
  const footerNavCardProps1: NavCardProps = {
    key: 0,
    buttonText: 'Blog',
    paraText: 'Read the latest posts',
    url: '/blog',
    navCardStylesSet,
  };

  const footerNavCardProps2: NavCardProps = {
    key: 1,
    buttonText: 'Mission',
    paraText: 'Our purpose and goals',
    url: '/mission',
    navCardStylesSet,
  };

  // Create the props for the NavCardSection component in the HomeFooter
  const footerNavCardSectionProps: NavCardSectionProps = {
    navAreaStyles: styles.sections.appsNav.navCardSection!.navAreaStyles,
    navCardPropsSet: [footerNavCardProps1, footerNavCardProps2],
  };

  // Create the props for the HomeFooter component
  const footerProps: HomeFooterProps = {
    text: '',
    stylesKV: styles.footer,
    navCardSectionProps: footerNavCardSectionProps,
  };

  /// Homepage ///

  // Create the PageProperties for the homepage
  const pageProps: PageProperties = {
    title: 'Home | Casinelli.io',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    lang: 'en',
    description: 'Welcome to Casinelli.io - Apps, Blog, and More',
  };

  // Create the StylesKV for the main div of the homepage
  const mainDivStylesKV: StylesKV = styles.page;

  // Create the HomePageProps object with all the props for the homepage components
  const homePageProps: HomePageProps = {
    pageProps,
    mainDivStylesKV,
    headerProps: homeHeaderProps,
    titleProps: homeTitleProps,
    appsNavSectionProps,
    footerProps,
  };

  return homePageProps;
}
