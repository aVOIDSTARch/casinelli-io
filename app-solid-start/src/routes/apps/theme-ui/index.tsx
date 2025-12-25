import { SiteLayout } from '~/components/layout';

export default function ThemeUIApp() {
  return (
    <SiteLayout fullWidth>
      <div class="theme-ui-app p-4">
        <h1 class="text-2xl font-light mb-4" style={{ 'font-family': 'Raleway, sans-serif' }}>
          Theme UI
        </h1>
        <p class="text-gray-600">Theme builder and previewer content goes here.</p>
        {/* Full app UI will be rendered in this space */}
      </div>
    </SiteLayout>
  );
}
