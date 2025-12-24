import type { StylesKV } from '~/utils/stylesKV';

export type { StylesKV };

export enum PageName {
  HOMEPAGE = 'homepage',
  APPS = 'apps',
  BLOG = 'blog',
  MISSION = 'mission',
}

export interface NavCardStylesSet {
  navCardStyles: StylesKV;
  buttonStyles: StylesKV;
  paraStyles: StylesKV;
}

export interface NavCardSectionStyles {
  navAreaStyles: StylesKV;
  navCardStylesSet: NavCardStylesSet;
}

export interface SectionStyles {
  container: StylesKV;
  navCardSection?: NavCardSectionStyles;
}

export interface PageStylesModule {
  page: StylesKV;
  header: StylesKV;
  title: StylesKV;
  sections: Record<string, SectionStyles>;
  footer: StylesKV;
}
