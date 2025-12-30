import { type Component, For, Show } from 'solid-js';
import BlogPreviewCard from './BlogPreviewCard';
import type { BlogPost } from '~/lib/blog-api';

// Tri-color scheme for rotating accent colors
const ACCENT_COLORS = [
  { accent: '#4F772D', hover: '#dce8d3' }, // Green
  { accent: '#FDC500', hover: '#fef6d9' }, // Gold
  { accent: '#004E89', hover: '#d9e4f0' }, // Blue
];

interface BlogLandingPageProps {
  posts: BlogPost[];
}

const BlogLandingPage: Component<BlogLandingPageProps> = (props) => {
  const getColorForIndex = (index: number) => {
    return ACCENT_COLORS[index % ACCENT_COLORS.length];
  };

  return (
    <div class="blog-landing">
      <h1
        class="text-3xl font-light mb-6"
        style={{ 'font-family': 'Raleway, sans-serif' }}
      >
        Blog
      </h1>

      <Show when={props.posts.length === 0}>
        <p class="text-gray-600">No blog posts yet. Check back soon!</p>
      </Show>

      <div class="blog-posts-grid">
        <For each={props.posts}>
          {(post, index) => {
            const colors = getColorForIndex(index());
            return (
              <BlogPreviewCard
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt || undefined}
                date={post.published_at || undefined}
                readTime={post.reading_time_minutes || undefined}
                accentColor={colors.accent}
                hoverColor={colors.hover}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default BlogLandingPage;
