import { type Component, For } from 'solid-js';
import BlogPreviewCard from './BlogPreviewCard';

// Tri-color scheme for rotating accent colors
const ACCENT_COLORS = [
  { accent: '#4F772D', hover: '#dce8d3' }, // Green
  { accent: '#FDC500', hover: '#fef6d9' }, // Gold
  { accent: '#004E89', hover: '#d9e4f0' }, // Blue
];

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  reading_time_minutes: number | null;
}

// Static placeholder posts - replace with your data source
const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Coming Soon',
    slug: 'coming-soon',
    excerpt: 'Blog posts are coming soon. Check back later for updates!',
    published_at: new Date().toISOString(),
    reading_time_minutes: 1,
  },
];

const BlogLandingPage: Component = () => {
  const posts = PLACEHOLDER_POSTS;

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

      <div class="blog-posts-grid">
        <For each={posts}>
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
