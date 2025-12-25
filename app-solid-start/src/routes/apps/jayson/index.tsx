import { SiteLayout } from '~/components/layout';

export default function JaysonApp() {
  return (
    <SiteLayout fullWidth>
      <div class="jayson-app p-4">
        <h1 class="text-2xl font-light mb-4" style={{ 'font-family': 'Raleway, sans-serif' }}>
          Jayson - JSON Tools
        </h1>
        <p class="text-gray-600">JSON utility application content goes here.</p>
        {/* Full app UI will be rendered in this space */}
      </div>
    </SiteLayout>
  );
}
