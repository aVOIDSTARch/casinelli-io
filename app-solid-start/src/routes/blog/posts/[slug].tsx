import { query, createAsync, useParams } from "@solidjs/router";
import { Suspense } from "solid-js";
import { SiteLayout } from '~/components/layout';
import BlogPostPage from '~/components/blog/posts/BlogPostPage';
import { BlogPostSkeleton } from '~/components/blog/BlogSkeleton';
import { fetchPostBySlug, type BlogPost } from '~/lib/blog-api';

const getPost = query(async (slug: string): Promise<BlogPost | null> => {
  "use server";
  try {
    return await fetchPostBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}, "blog-post");

export const route = {
  load: ({ params }: { params: { slug: string } }) => getPost(params.slug),
};

export default function BlogPostRoute() {
  const params = useParams<{ slug: string }>();
  const post = createAsync(() => getPost(params.slug));

  return (
    <SiteLayout title={post()?.title || "Blog Post"}>
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostPage post={post()} />
      </Suspense>
    </SiteLayout>
  );
}
