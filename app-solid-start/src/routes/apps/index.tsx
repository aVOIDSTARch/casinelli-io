import { SiteLayout } from '~/components/layout';
import AppsNavSection from '~/components/homepage/AppsNavSection';
import generateAppsPageProps from '~/components/apps/AppsPagePropsGen';

export default function AppsPage() {
  const { appsNavSectionProps } = generateAppsPageProps();

  return (
    <SiteLayout>
      <AppsNavSection
        title={appsNavSectionProps.title}
        stylesKV={appsNavSectionProps.stylesKV}
        navCardSectionProps={appsNavSectionProps.navCardSectionProps}
      />
    </SiteLayout>
  );
}
