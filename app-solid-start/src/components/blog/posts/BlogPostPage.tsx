import { type Component, Show } from 'solid-js';
import { SiteLayout } from '~/components/layout';
import type { BlogPost } from '~/lib/blog-api';

interface BlogPostPageProps {
  post: BlogPost | null | undefined;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogPostPage: Component<BlogPostPageProps> = (props) => {
  return (
    <SiteLayout>
      <div class="blog-post-page">
        <Show when={!props.post}>
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

        <Show when={props.post}>
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
