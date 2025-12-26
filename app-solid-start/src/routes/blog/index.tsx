import { SiteLayout } from '~/components/layout';
import BlogLandingPage from '~/components/blog/BlogLandingPage';

export default function BlogPage() {
  return (
    <SiteLayout title="Blog">
      <BlogLandingPage />
    </SiteLayout>
  );
}
