import { type Component } from 'solid-js';
import { A } from '@solidjs/router';

export interface BlogBannerProps {
  title?: string;
}

const BlogBanner: Component<BlogBannerProps> = (props) => {
  const title = () => props.title ?? 'casinelli.io';

  return (
    <header class="blog-banner">
      <A href="/" class="banner-title">
        {title()}
      </A>
    </header>
  );
};

export default BlogBanner;
