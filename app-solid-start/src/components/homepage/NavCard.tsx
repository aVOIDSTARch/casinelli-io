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
  imageUrl?: string;
  imageAlt?: string;
  accentColor?: string;
}

const NavCard: Component<NavCardProps> = (props) => {
  const showPara = createMemo(() => Boolean(props.paraText));
  const showImage = createMemo(() => Boolean(props.imageUrl));

  return (
    <section classList={props.navCardStylesSet.navCardStyles}>
      {/* Accent color strip at top */}
      <div
        class="nav-card-accent"
        style={{ 'background-color': props.accentColor || '#e1e1e1' }}
      />

      {/* Card content container */}
      <div class="nav-card-content">
        {/* Image */}
        <Show when={showImage()}>
          <div class="nav-card-image-wrapper">
            <img
              src={props.imageUrl}
              alt={props.imageAlt || props.buttonText || 'Card image'}
              class="nav-card-image"
            />
          </div>
        </Show>

        {/* Paragraph */}
        <Show when={showPara()}>
          <p classList={props.navCardStylesSet.paraStyles}>{props.paraText}</p>
        </Show>

        {/* Button */}
        <A href={props.url || '#'} classList={props.navCardStylesSet.buttonStyles}>
          {props.buttonText}
        </A>
      </div>
    </section>
  );
};

export default NavCard;
