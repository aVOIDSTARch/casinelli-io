import { type Component, Show, createMemo } from 'solid-js';
import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';

export interface BlogPreviewCardProps {
  /** Post title */
  title: string;
  /** Post slug for URL */
  slug: string;
  /** Excerpt/summary text */
  excerpt?: string;
  /** Publication date */
  date?: string;
  /** Category name */
  category?: string;
  /** Estimated reading time in minutes */
  readTime?: number;
  /** Accent color for the card */
  accentColor?: string;
  /** Hover color (lighter version) */
  hoverColor?: string;
}

const BlogPreviewCard: Component<BlogPreviewCardProps> = (props) => {
  const postUrl = () => `/blog/posts/${props.slug}`;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Build card style with CSS custom property for accent color
  const cardStyle = createMemo((): JSX.CSSProperties => {
    const styles: JSX.CSSProperties = {};
    if (props.accentColor) {
      styles['--card-accent-color'] = props.accentColor;
    }
    if (props.hoverColor) {
      styles['--card-hover-color'] = props.hoverColor;
    }
    return styles;
  });

  return (
    <article class="blog-preview-card" style={cardStyle()}>
      {/* Accent line at top */}
      <div
        class="blog-preview-accent"
        style={{ 'background-color': props.accentColor || '#e1e1e1' }}
      />

      {/* Card content */}
      <div class="blog-preview-content">
        {/* Header row: title and date */}
        <div class="blog-preview-header">
          <A href={postUrl()} class="blog-preview-title">
            {props.title}
          </A>
          <Show when={props.date}>
            <span class="blog-preview-date">{formatDate(props.date!)}</span>
          </Show>
        </div>

        {/* Excerpt */}
        <Show when={props.excerpt}>
          <p class="blog-preview-excerpt">{props.excerpt}</p>
        </Show>

        {/* Footer row: category, read time, button */}
        <div class="blog-preview-footer">
          <div class="blog-preview-meta">
            <Show when={props.category}>
              <span class="blog-preview-category">{props.category}</span>
            </Show>
            <Show when={props.readTime}>
              <span class="blog-preview-readtime">{props.readTime} min read</span>
            </Show>
          </div>
          <A href={postUrl()} class="blog-preview-button">
            Read More →
          </A>
        </div>
      </div>
    </article>
  );
};

export default BlogPreviewCard;
