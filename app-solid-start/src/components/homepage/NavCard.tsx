import { Show, type Component, createMemo } from 'solid-js';
import { A, useNavigate, useLocation } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { StylesKV } from '~/utils/stylesKV';

export interface NavCardStylesSet {
  navCardStyles: StylesKV;
  buttonStyles: StylesKV;
  paraStyles: StylesKV;
}

/** Custom hover styles for individual button effects */
export interface ButtonHoverStyles {
  /** Background color when card is hovered (lighter version) */
  cardHoverBg?: string;
  /** Border color when card is hovered */
  cardHoverBorder?: string;
  /** Background color when button is hovered (full color) */
  hoverBg?: string;
  /** Text color when button is hovered */
  hoverColor?: string;
  /** Border color when button is hovered */
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
  const loc = useLocation();
  const navigate = useNavigate();

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
    // Card hover styles (lighter version)
    if (props.buttonHoverStyles?.cardHoverBg) {
      styles['--btn-card-hover-bg'] = props.buttonHoverStyles.cardHoverBg;
    }
    if (props.buttonHoverStyles?.cardHoverBorder) {
      styles['--btn-card-hover-border'] = props.buttonHoverStyles.cardHoverBorder;
    }
    // Button hover styles (full color)
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
          onClick={(e) => {
            // Only intercept when on homepage and navigating internally
            if (loc.pathname === '/' && props.url && props.url.startsWith('/')) {
              e.preventDefault();
              document.body.classList.add('home-exit');
              // Delay navigation to allow CSS animation to run
              setTimeout(() => {
                navigate(props.url as string);
              }, 480);
            }
          }}
        >
          {props.buttonText}
        </A>
      </div>
    </section>
  );
};

export default NavCard;
