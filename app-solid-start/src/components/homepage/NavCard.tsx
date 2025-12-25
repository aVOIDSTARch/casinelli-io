import { Show, type Component, createMemo } from 'solid-js';
import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { StylesKV } from '~/utils/stylesKV';

export interface NavCardStylesSet {
  navCardStyles: StylesKV;
  buttonStyles: StylesKV;
  paraStyles: StylesKV;
}

/** Custom hover styles for individual button effects */
export interface ButtonHoverStyles {
  /** Background color on hover */
  hoverBg?: string;
  /** Text color on hover */
  hoverColor?: string;
  /** Border color on hover */
  hoverBorder?: string;
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
  /** Color shown behind image when card is hovered */
  cardHoverColor?: string;
  /** Custom button hover styles - overrides default hover effect */
  buttonHoverStyles?: ButtonHoverStyles;
}

const NavCard: Component<NavCardProps> = (props) => {
  const showPara = createMemo(() => Boolean(props.paraText));
  const showImage = createMemo(() => Boolean(props.imageUrl));

  // Build card style with CSS custom property for hover color
  const cardStyle = createMemo((): JSX.CSSProperties => {
    const styles: JSX.CSSProperties = {};
    if (props.cardHoverColor) {
      styles['--card-hover-color'] = props.cardHoverColor;
    }
    return styles;
  });

  // Build button style with CSS custom properties for hover effects
  const buttonStyle = createMemo((): JSX.CSSProperties => {
    const styles: JSX.CSSProperties = {};
    if (props.buttonHoverStyles?.hoverBg) {
      styles['--btn-hover-bg'] = props.buttonHoverStyles.hoverBg;
    }
    if (props.buttonHoverStyles?.hoverColor) {
      styles['--btn-hover-color'] = props.buttonHoverStyles.hoverColor;
    }
    if (props.buttonHoverStyles?.hoverBorder) {
      styles['--btn-hover-border'] = props.buttonHoverStyles.hoverBorder;
    }
    return styles;
  });

  return (
    <section classList={props.navCardStylesSet.navCardStyles} style={cardStyle()}>
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

        {/* Button with custom hover styles */}
        <A
          href={props.url || '#'}
          classList={props.navCardStylesSet.buttonStyles}
          style={buttonStyle()}
        >
          {props.buttonText}
        </A>
      </div>
    </section>
  );
};

export default NavCard;
