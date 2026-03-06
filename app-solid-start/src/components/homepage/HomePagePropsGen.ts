/**
 * Homepage props generator
 * Uses projects data as single source of truth for project cards
 */

import type { HomePageProps } from './homePageIndex';
import type { PageProperties } from '~/types/PageProperties';
import type { AppsNavSectionProps } from './AppsNavSection';
import type { HomeFooterProps } from './HomeFooter';
import type { HomeTitleProps } from './HomeTitle';
import type { NavCardProps } from './NavCard';
import type { NavCardSectionProps } from './NavCardSection';
import type { HomeHeaderProps } from './HomeHeader';
import { getPageStyles, PageName, type PageStylesModule, type StylesKV } from '~/styles/engine';
import { PROJECTS } from '~/data/projects';
import { projectToNavCardProps } from '~/utils/projectToNavCard';

export default function generateHomePageProps(): HomePageProps {
  const styles: PageStylesModule = getPageStyles(PageName.HOMEPAGE);
  const navCardStylesSet = styles.sections.appsNav.navCardSection!.navCardStylesSet;

  const homeHeaderProps: HomeHeaderProps = {
    text: '',
    stylesKV: styles.header,
  };

  const homeTitleProps: HomeTitleProps = {
    title: 'casinelli.io',
    tagline: 'Projects, tools, and writing.',
    stylesKV: styles.title,
  };

  const projectNavCardProps: NavCardProps[] = PROJECTS.map((p, i) =>
    projectToNavCardProps(p, i, navCardStylesSet, { badgeOnlyLive: true })
  );

  const appsNavSectionProps: AppsNavSectionProps = {
    title: '',
    stylesKV: styles.sections.appsNav.container,
    navCardSectionProps: {
      navAreaStyles: styles.sections.appsNav.navCardSection!.navAreaStyles,
      navCardPropsSet: projectNavCardProps,
    },
  };

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

  const footerProps: HomeFooterProps = {
    text: '',
    stylesKV: styles.footer,
    navCardSectionProps: {
      navAreaStyles: styles.sections.appsNav.navCardSection!.navAreaStyles,
      navCardPropsSet: [footerNavCardProps1, footerNavCardProps2],
    },
  };

  const pageProps: PageProperties = {
    title: 'Home | Casinelli.io',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    lang: 'en',
    description: 'Welcome to Casinelli.io - Projects, Blog, and More',
  };

  return {
    pageProps,
    mainDivStylesKV: styles.page,
    headerProps: homeHeaderProps,
    titleProps: homeTitleProps,
    appsNavSectionProps,
    footerProps,
  };
}
