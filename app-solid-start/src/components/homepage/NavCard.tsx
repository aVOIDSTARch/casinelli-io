import { Show, type Component, createMemo } from 'solid-js';
import { A } from '@solidjs/router';
import { StylesKV } from '~/utils/stylesKV';

export interface NavCardStylesSet {
  navCardStyles: StylesKV;
  buttonStyles: StylesKV;
  paraStyles: StylesKV;
}

export interface NavCardProps {
  paraText?: string;
  buttonText?: string;
  url?: string;
  key: number;
  navCardStylesSet: NavCardStylesSet;
}

const NavCard: Component<NavCardProps> = (props) => {
  const showPara = createMemo(() => Boolean(props.paraText));

  return (
    <section classList={props.navCardStylesSet.navCardStyles}>
      <A href={props.url || '#'} classList={props.navCardStylesSet.buttonStyles}>
        {props.buttonText}
      </A>
      <Show when={showPara()}>
        <p classList={props.navCardStylesSet.paraStyles}>{props.paraText}</p>
      </Show>
    </section>
  );
};

export default NavCard;
