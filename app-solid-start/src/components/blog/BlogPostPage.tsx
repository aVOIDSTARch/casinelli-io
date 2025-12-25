import { type Component, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { SiteLayout } from '~/components/layout';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  published_at: string | null;
  reading_time_minutes: number | null;
}

// Static placeholder posts - replace with your data source
const PLACEHOLDER_POSTS: Record<string, BlogPost> = {
  'coming-soon': {
    id: '1',
    title: 'Coming Soon',
    slug: 'coming-soon',
    content: '<p>Blog posts are coming soon. Check back later for updates!</p>',
    excerpt: 'Blog posts are coming soon.',
    published_at: new Date().toISOString(),
    reading_time_minutes: 1,
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogPostPage: Component = () => {
  const params = useParams();
  const post = () => PLACEHOLDER_POSTS[params.slug] || null;

  return (
    <SiteLayout>
      <div class="blog-post-page">
        <Show when={!post()}>
          <div class="blog-post-not-found">
            <h1
              class="text-2xl font-light mb-4"
              style={{ 'font-family': 'Raleway, sans-serif' }}
            >
              Post Not Found
            </h1>
            <p class="text-gray-600 mb-4">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/blog"
              class="text-blue-600 hover:underline"
            >
              ← Back to Blog
            </a>
          </div>
        </Show>

        <Show when={post()}>
          {(postData) => (
            <>
              <article class="blog-post-article">
                <header class="blog-post-header">
                  <a
                    href="/blog"
                    class="blog-post-back-link"
                  >
                    ← Back to Blog
                  </a>

                  <h1 class="blog-post-title">
                    {postData().title}
                  </h1>

                  <div class="blog-post-meta">
                    <Show when={postData().published_at}>
                      <span class="blog-post-date">
                        {formatDate(postData().published_at!)}
                      </span>
                    </Show>
                    <Show when={postData().reading_time_minutes}>
                      <span class="blog-post-divider">•</span>
                      <span class="blog-post-readtime">
                        {postData().reading_time_minutes} min read
                      </span>
                    </Show>
                  </div>
                </header>

                <div
                  class="blog-post-content"
                  innerHTML={postData().content || ''}
                />
              </article>

              <footer class="blog-post-footer">
                <a
                  href="/blog"
                  class="blog-post-back-link"
                >
                  ← Back to Blog
                </a>
              </footer>
            </>
          )}
        </Show>
      </div>
    </SiteLayout>
  );
};

export default BlogPostPage;
