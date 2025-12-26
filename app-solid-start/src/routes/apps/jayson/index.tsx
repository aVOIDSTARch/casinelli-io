import { SiteLayout } from '~/components/layout';
import JaysonApp from '~/components/apps/jayson/JaysonApp';

export default function JaysonPage() {
  return (
    <SiteLayout fullWidth>
      <div class="p-4 md:p-6">
        <JaysonApp />
      </div>
    </SiteLayout>
  );
}
