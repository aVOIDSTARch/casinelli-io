import { type Component, type JSX } from 'solid-js';

export interface HomeLayoutProps {
  children: JSX.Element;
  fullWidth?: boolean;
}

const HomeLayout: Component<HomeLayoutProps> = (props) => {
  return (
    <div class="site-layout">
      <div class="content-side left">
        <div class="side-nav-placeholder" aria-hidden="true" />
      </div>

      <main class="main-content">
        <div class="app-container">{props.children}</div>
      </main>

      <div class="content-side right" />
    </div>
  );
};

export default HomeLayout;
