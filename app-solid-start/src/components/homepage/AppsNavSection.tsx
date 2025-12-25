import { type Component, Show } from 'solid-js';
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
      <Show when={props.title}>
        <h2>{props.title}</h2>
      </Show>
      <Show when={props.navCardSectionProps}>
        <NavCardSection
          navAreaStyles={props.navCardSectionProps!.navAreaStyles}
          navCardPropsSet={props.navCardSectionProps!.navCardPropsSet}
        />
      </Show>
    </section>
  );
};

export default AppsNavSection;
