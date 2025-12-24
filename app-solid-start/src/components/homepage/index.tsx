// This is the whole page to serve for the homepage

import { type Component, mergeProps } from 'solid-js';
import HomeHeader, { HomeHeaderProps } from './HomeHeader';
import HomeTitle, { TitleProps } from './HomeTitle';
import AppsNavSection, { AppsNavSectionProps } from './AppsNavSection';
import HomeFooter, { HomeFooterProps } from './HomeFooter';
import type { PageProperties } from '~/types/PageProperties';

interface HomePageProps {
  pageProps?: PageProperties;
  mainDivStylesKV?: { [k: string]: boolean };
  headerProps?: HomeHeaderProps;
  titleProps?: TitleProps;
  appsNavSectionProps?: AppsNavSectionProps;
  footerProps?: HomeFooterProps;
}

const defaultProps: Required<HomePageProps> = {
  pageProps: {
    title: 'Home | Casinelli.io',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    lang: 'en',
    description: 'Welcome to Casinelli.io',
  },
  mainDivStylesKV: {},
  headerProps: {
    text: 'Header text',
    stylesKV: {},
  },
  titleProps: {
    title: 'casinelli.io',
    stylesKV: {},
  },
  appsNavSectionProps: {
    title: '',
    stylesKV: {},
    navCardSectionProps: undefined,
  },
  footerProps: {
    text: '',
    stylesKV: {},
    navCardSectionProps: undefined,
  },
};

const HomePage: Component<HomePageProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  return (
    <div classList={props.mainDivStylesKV}>
      <HomeHeader
        text={props.headerProps.text}
        stylesKV={props.headerProps.stylesKV}
      />
      <HomeTitle
        title={props.titleProps.title}
        stylesKV={props.titleProps.stylesKV}
      />
      <AppsNavSection
        title={props.appsNavSectionProps.title}
        stylesKV={props.appsNavSectionProps.stylesKV}
        navCardSectionProps={props.appsNavSectionProps.navCardSectionProps}
      />
      <HomeFooter
        text={props.footerProps.text}
        stylesKV={props.footerProps.stylesKV}
        navCardSectionProps={props.footerProps.navCardSectionProps}
      />
    </div>
  );
};

export default HomePage;
