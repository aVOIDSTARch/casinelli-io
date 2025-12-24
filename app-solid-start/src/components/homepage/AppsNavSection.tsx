import { type Component } from 'solid-js';
import NavCardSection, { NavCardSectionProps } from './NavCardSection';
import { StylesKV } from '~/utils/stylesKV';

export interface AppsNavSectionProps {
  title?: string;
  stylesKV?: StylesKV;
  navCardSectionProps?: NavCardSectionProps;
}

const AppsNavSection: Component<AppsNavSectionProps> = (props) => {
  return (
    <section classList={props.stylesKV}>
      {props.title && <h2>{props.title}</h2>}
      {props.navCardSectionProps && (
        <NavCardSection
          navAreaStyles={props.navCardSectionProps.navAreaStyles}
          navCardPropsSet={props.navCardSectionProps.navCardPropsSet}
        />
      )}
    </section>
  );
};

export default AppsNavSection;
