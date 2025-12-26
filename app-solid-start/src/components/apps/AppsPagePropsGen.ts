// This Module creates props for the Apps page nav cards

import type { AppsNavSectionProps } from '~/components/homepage/AppsNavSection';
import type { NavCardProps } from '~/components/homepage/NavCard';
import type { NavCardSectionProps } from '~/components/homepage/NavCardSection';
import {
  getPageStyles,
  PageName,
  type PageStylesModule,
  type NavCardStylesSet,
} from '~/styles/engine';

export interface AppsPageProps {
  appsNavSectionProps: AppsNavSectionProps;
}

export default function generateAppsPageProps(): AppsPageProps {
  // Get styles from the engine
  const styles: PageStylesModule = getPageStyles(PageName.APPS);

  // Extract the navCardStylesSet from the styles object
  const navCardStylesSet: NavCardStylesSet =
    styles.sections.content.navCardSection!.navCardStylesSet;

  // Create the props for the THREE NavCard components
  const appsNavCardProps1: NavCardProps = {
    key: 0,
    buttonText: 'Color',
    paraText: 'Color utility tools',
    url: '/apps/color',
    navCardStylesSet,
    imageUrl: '/floral_176.png',
    imageAlt: 'Floral pattern',
    cardHoverColor: '#4F772D',
    buttonHoverStyles: {
      cardHoverBg: '#dce8d3',
      cardHoverBorder: '#90a97a',
      hoverBg: '#4F772D',
      hoverColor: '#ffffff',
      hoverBorder: '#4F772D',
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
    cardHoverColor: '#FDC500',
    buttonHoverStyles: {
      cardHoverBg: '#fef6d9',
      cardHoverBorder: '#e6b300',
      hoverBg: '#FDC500',
      hoverColor: '#3d2e00',
      hoverBorder: '#FDC500',
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
    cardHoverColor: '#004E89',
    buttonHoverStyles: {
      cardHoverBg: '#d9e4f0',
      cardHoverBorder: '#6699bb',
      hoverBg: '#004E89',
      hoverColor: '#ffffff',
      hoverBorder: '#004E89',
    },
  };

  // Create the props for the NavCardSection
  const navCardSectionProps: NavCardSectionProps = {
    navAreaStyles: styles.sections.content.navCardSection!.navAreaStyles,
    navCardPropsSet: [appsNavCardProps1, appsNavCardProps2, appsNavCardProps3],
  };

  // Create the props for the AppsNavSection component
  const appsNavSectionProps: AppsNavSectionProps = {
    title: '',
    stylesKV: styles.sections.content.container,
    navCardSectionProps,
  };

  return {
    appsNavSectionProps,
  };
}
