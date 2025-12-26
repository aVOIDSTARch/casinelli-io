import { type Component, type JSX, onMount } from 'solid-js';
import SideNav, { type NavItem } from './SideNav';
import HomeHeader from '~/components/homepage/HomeHeader';
import HomeTitle from '~/components/homepage/HomeTitle';

export interface SiteLayoutProps {
  /** Page content to render in main area */
  children: JSX.Element;
  /** Optional custom title for the banner */
  title?: string;
  /** Optional custom side nav items */
  sideNavItems?: NavItem[];
  /** Use full-width content area (for apps) */
  fullWidth?: boolean;
}

const SiteLayout: Component<SiteLayoutProps> = (props) => {
  onMount(() => {
    // Clear any homepage exit class when navigating to other pages
    try {
      document.body.classList.remove('home-exit');
    } catch (e) {
      /* ignore */
    }
  });
  return (
    <div class="site-layout">
      <SideNav items={props.sideNavItems} />
      <main class="main-content">

        <div class="layout-body">

          <div class="content-full">
            <section class="app-container">
              <HomeHeader
                stylesKV={{ 'home-header': true }}
                titleProps={{ title: 'casinelli.io', stylesKV: { 'home-title': true } }}
              />
              {props.children}
            </section>
          </div>
        </div>
      </main>

      </div>
  );
};

export default SiteLayout;

// Re-export types for convenience
export type { NavItem };
