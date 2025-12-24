import { type Component, For } from 'solid-js';
import NavCard, { NavCardProps, NavCardStylesSet } from './NavCard';
import { StylesKV } from '~/utils/stylesKV';
export interface NavCardSectionProps {
  navAreaStyles: StylesKV;
  navCardPropsSet: NavCardProps[];
}

const NavCardSection: Component<NavCardSectionProps> = (props) => {
  const data = () => props.navCardPropsSet;

  return (
    <nav classList={props.navAreaStyles}>
      <For each={data()}>
        {(propsSet, index) => (
          <NavCard
            key={index()}
            paraText={propsSet.paraText}
            buttonText={propsSet.buttonText}
            url={propsSet.url}
            navCardStylesSet={propsSet.navCardStylesSet}
          />
        )}
      </For>
    </nav>
  );
};

export default NavCardSection;
