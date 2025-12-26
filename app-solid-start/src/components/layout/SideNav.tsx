import { type Component, For } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export interface NavItem {
  label: string;
  href: string;
  color?: 'green' | 'gold' | 'blue';
}

export interface SideNavProps {
  items?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/', color: 'green' },
  { label: 'Apps', href: '/apps', color: 'gold' },
  { label: 'Blog', href: '/blog', color: 'blue' },
  { label: 'Mission', href: '/mission', color: 'green' },
];

const SideNav: Component<SideNavProps> = (props) => {
  const location = useLocation();
  const navItems = () => props.items ?? defaultNavItems;

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav class="side-nav">
      <For each={navItems()}>
        {(item) => (
          <div class="nav-item">
            <A
              href={item.href}
              class="side-nav-link"
              classList={{ active: isActive(item.href) }}
              data-color={item.color}
            >
              {item.label}
            </A>
          </div>
        )}
      </For>
    </nav>
  );
};

export default SideNav;
