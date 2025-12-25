import { SiteLayout } from '~/components/layout';

export default function AppsPage() {
  return (
    <SiteLayout>
      <div class="apps-landing">
        <h1 class="text-3xl font-light mb-6" style={{ 'font-family': 'Raleway, sans-serif' }}>
          Apps
        </h1>
        <p class="text-gray-600 mb-4">Explore our utility applications:</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li><a href="/apps/color" class="text-blue-600 hover:underline">Color</a> - Color utility tools</li>
          <li><a href="/apps/jayson" class="text-blue-600 hover:underline">Jayson</a> - JSON utility tools</li>
          <li><a href="/apps/theme-ui" class="text-blue-600 hover:underline">Theme UI</a> - Theme builder and previewer</li>
        </ul>
      </div>
    </SiteLayout>
  );
}
