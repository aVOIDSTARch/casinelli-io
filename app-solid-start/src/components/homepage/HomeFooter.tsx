import { type Component } from 'solid-js';
import NavCardSection, { NavCardSectionProps } from './NavCardSection';
import { StylesKV } from '~/utils/stylesKV';

export interface HomeFooterProps {
  text?: string;
  stylesKV?: StylesKV;
  navCardSectionProps?: NavCardSectionProps;
}

const HomeFooter: Component<HomeFooterProps> = (props) => {
  return (
    <footer classList={props.stylesKV}>
      {props.text}
      {props.navCardSectionProps && (
        <NavCardSection
          navAreaStyles={props.navCardSectionProps.navAreaStyles}
          navCardPropsSet={props.navCardSectionProps.navCardPropsSet}
        />
      )}
    </footer>
  );
};

export default HomeFooter;
