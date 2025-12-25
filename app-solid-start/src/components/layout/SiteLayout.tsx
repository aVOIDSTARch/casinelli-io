import { type Component, type JSX } from 'solid-js';
import TopBanner from './TopBanner';
import SideNav, { type NavItem } from './SideNav';

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
  return (
    <div class="site-layout">
      <TopBanner title={props.title} />
      <div class="layout-body">
        <SideNav items={props.sideNavItems} />
        <main class="main-content">
          <div class={props.fullWidth ? 'content-full' : 'content-container'}>
            {props.children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SiteLayout;

// Re-export types for convenience
export type { NavItem };
