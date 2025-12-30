import { query, createAsync } from "@solidjs/router";
import { SiteLayout } from '~/components/layout';
import BlogLandingPage from '~/components/blog/BlogLandingPage';
import { fetchPublishedPosts, type BlogPost } from '~/lib/blog-api';

const getPosts = query(async (): Promise<BlogPost[]> => {
  "use server";
  try {
    const response = await fetchPublishedPosts({ limit: 50 });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}, "blog-posts");

export const route = {
  load: () => getPosts(),
};

export default function BlogPage() {
  const posts = createAsync(() => getPosts());

  return (
    <SiteLayout title="Blog">
      <BlogLandingPage posts={posts() ?? []} />
    </SiteLayout>
  );
}
