import { type Component, For } from 'solid-js';

/**
 * Skeleton loading component for blog post cards
 */
export const BlogCardSkeleton: Component = () => {
  return (
    <div class="blog-card-skeleton animate-pulse">
      <div class="p-6 border border-gray-200 rounded-lg">
        {/* Title skeleton */}
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        {/* Excerpt skeleton - 2 lines */}
        <div class="space-y-2 mb-4">
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>
        {/* Meta skeleton */}
        <div class="flex gap-4">
          <div class="h-3 bg-gray-100 rounded w-24"></div>
          <div class="h-3 bg-gray-100 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton grid for blog landing page
 */
export const BlogGridSkeleton: Component<{ count?: number }> = (props) => {
  const count = () => props.count ?? 6;

  return (
    <div class="blog-posts-grid">
      <For each={Array(count()).fill(0)}>
        {() => <BlogCardSkeleton />}
      </For>
    </div>
  );
};

/**
 * Skeleton for individual blog post page
 */
export const BlogPostSkeleton: Component = () => {
  return (
    <article class="blog-post-skeleton animate-pulse max-w-3xl mx-auto">
      {/* Back link skeleton */}
      <div class="h-4 bg-gray-100 rounded w-20 mb-8"></div>

      {/* Title skeleton */}
      <div class="h-10 bg-gray-200 rounded w-4/5 mb-4"></div>

      {/* Meta skeleton */}
      <div class="flex gap-4 mb-8">
        <div class="h-4 bg-gray-100 rounded w-32"></div>
        <div class="h-4 bg-gray-100 rounded w-20"></div>
      </div>

      {/* Content skeleton - multiple paragraphs */}
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-3/4"></div>
        </div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-5/6"></div>
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-2/3"></div>
        </div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-4/5"></div>
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;
