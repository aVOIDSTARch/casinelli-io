import { type Component } from 'solid-js';
import { A } from '@solidjs/router';

export interface TopBannerProps {
  title?: string;
}

const TopBanner: Component<TopBannerProps> = (props) => {
  const title = () => props.title ?? 'casinelli.io';

  return (
    <header class="top-banner">
      <A href="/" class="banner-title">
        {title()}
      </A>
    </header>
  );
};

export default TopBanner;
