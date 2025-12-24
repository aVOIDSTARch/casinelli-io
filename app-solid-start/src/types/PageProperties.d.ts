/**
 * Page metadata and header properties for HTML5 documents.
 * Required fields are those mandated by HTML5 standards for valid documents.
 */

/** Open Graph metadata for social sharing */
export interface OpenGraphProperties {
  /** og:title - Title for social cards */
  title?: string;
  /** og:description - Description for social cards */
  description?: string;
  /** og:image - Image URL for social cards */
  image?: string;
  /** og:image:alt - Alt text for OG image */
  imageAlt?: string;
  /** og:image:width */
  imageWidth?: number;
  /** og:image:height */
  imageHeight?: number;
  /** og:url - Canonical URL for sharing */
  url?: string;
  /** og:type - Content type (website, article, profile, etc.) */
  type?: 'website' | 'article' | 'profile' | 'book' | 'music' | 'video' | string;
  /** og:site_name - Name of the overall site */
  siteName?: string;
  /** og:locale - Locale in format language_TERRITORY */
  locale?: string;
  /** og:locale:alternate - Alternate locales available */
  localeAlternate?: string[];
}

/** Twitter card metadata */
export interface TwitterCardProperties {
  /** twitter:card - Card type */
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** twitter:site - @username of website */
  site?: string;
  /** twitter:creator - @username of content creator */
  creator?: string;
  /** twitter:title - Title (falls back to og:title) */
  title?: string;
  /** twitter:description - Description (falls back to og:description) */
  description?: string;
  /** twitter:image - Image URL (falls back to og:image) */
  image?: string;
  /** twitter:image:alt - Alt text for image */
  imageAlt?: string;
}

/** Article-specific metadata (for blog posts, news, etc.) */
export interface ArticleProperties {
  /** article:published_time - ISO 8601 datetime */
  publishedTime?: string;
  /** article:modified_time - ISO 8601 datetime */
  modifiedTime?: string;
  /** article:expiration_time - ISO 8601 datetime */
  expirationTime?: string;
  /** article:author - Author URL(s) or name(s) */
  author?: string | string[];
  /** article:section - Category/section name */
  section?: string;
  /** article:tag - Tags/keywords */
  tags?: string[];
}

/** Link elements for document head */
export interface LinkProperties {
  /** Canonical URL - prevents duplicate content issues */
  canonical?: string;
  /** Alternate language versions - hreflang links */
  alternate?: Array<{
    href: string;
    hreflang: string;
    title?: string;
  }>;
  /** Preconnect URLs for performance */
  preconnect?: string[];
  /** DNS prefetch URLs */
  dnsPrefetch?: string[];
  /** Preload resources */
  preload?: Array<{
    href: string;
    as: 'script' | 'style' | 'image' | 'font' | 'fetch' | 'document';
    type?: string;
    crossorigin?: 'anonymous' | 'use-credentials';
  }>;
  /** RSS/Atom feed URLs */
  feeds?: Array<{
    href: string;
    type: 'application/rss+xml' | 'application/atom+xml';
    title?: string;
  }>;
  /** Favicon/icon links */
  icons?: Array<{
    href: string;
    type?: string;
    sizes?: string;
    rel?: 'icon' | 'apple-touch-icon' | 'mask-icon';
    color?: string;
  }>;
  /** Web manifest */
  manifest?: string;
}

/** Structured data (JSON-LD) */
export interface StructuredDataProperties {
  /** JSON-LD structured data objects */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/** Robot/crawler directives */
export interface RobotsProperties {
  /** robots meta content */
  robots?: string;
  /** googlebot specific directives */
  googlebot?: string;
  /** bingbot specific directives */
  bingbot?: string;
  /** Prevent Google from showing sitelinks search box */
  nositelinkssearchbox?: boolean;
  /** Prevent translation offers */
  notranslate?: boolean;
}

/** Verification codes for webmaster tools */
export interface VerificationProperties {
  google?: string;
  bing?: string;
  yandex?: string;
  pinterest?: string;
}

/**
 * Complete page properties interface.
 *
 * Required by HTML5 standard:
 * - title: Every HTML document MUST have a <title> element
 *
 * Strongly recommended:
 * - charset (defaults to UTF-8)
 * - viewport (for responsive design)
 * - description (for SEO)
 */
export interface PageProperties {
  // ============================================================================
  // REQUIRED BY HTML5
  // ============================================================================

  /**
   * Document title - REQUIRED by HTML5 specification.
   * Appears in browser tab, bookmarks, and search results.
   * @see https://html.spec.whatwg.org/#the-title-element
   */
  title: string;

  // ============================================================================
  // STRONGLY RECOMMENDED (have sensible defaults)
  // ============================================================================

  /**
   * Character encoding - should be UTF-8 for modern web.
   * @default "UTF-8"
   */
  charset?: 'UTF-8' | 'ISO-8859-1' | string;

  /**
   * Viewport configuration for responsive design.
   * @default "width=device-width, initial-scale=1"
   */
  viewport?: string;

  /**
   * Document language - important for accessibility and SEO.
   * Should match the <html lang=""> attribute.
   * @example "en", "en-US", "es", "fr"
   */
  lang?: string;

  /**
   * Text direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl' | 'auto';

  // ============================================================================
  // SEO & DISCOVERY
  // ============================================================================

  /**
   * Meta description - critical for SEO.
   * Shown in search engine results. Recommended 150-160 characters.
   */
  description?: string;

  /**
   * Meta keywords - largely ignored by modern search engines.
   * @deprecated Most search engines ignore this
   */
  keywords?: string[];

  /**
   * Author of the page content.
   */
  author?: string;

  /**
   * Generator/CMS that created the page.
   */
  generator?: string;

  /**
   * Application name for web apps.
   */
  applicationName?: string;

  /**
   * Theme color for browser chrome.
   * Can be a single color or array for light/dark mode.
   */
  themeColor?: string | { light: string; dark: string };

  /**
   * Color scheme preference.
   */
  colorScheme?: 'light' | 'dark' | 'light dark' | 'normal';

  // ============================================================================
  // SOCIAL & SHARING
  // ============================================================================

  /** Open Graph properties for Facebook, LinkedIn, etc. */
  openGraph?: OpenGraphProperties;

  /** Twitter card properties */
  twitter?: TwitterCardProperties;

  /** Article-specific metadata */
  article?: ArticleProperties;

  // ============================================================================
  // TECHNICAL SEO
  // ============================================================================

  /** Link elements */
  links?: LinkProperties;

  /** Robot directives */
  robots?: RobotsProperties;

  /** Webmaster verification codes */
  verification?: VerificationProperties;

  /** Structured data (JSON-LD) */
  structuredData?: StructuredDataProperties;

  // ============================================================================
  // SECURITY & PRIVACY
  // ============================================================================

  /**
   * Referrer policy for outbound links.
   */
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';

  /**
   * Content Security Policy.
   */
  contentSecurityPolicy?: string;

  // ============================================================================
  // MOBILE & PWA
  // ============================================================================

  /**
   * Format detection - disable auto-linking of phone numbers, etc.
   */
  formatDetection?: {
    telephone?: boolean;
    date?: boolean;
    address?: boolean;
    email?: boolean;
  };

  /**
   * Apple-specific meta tags for iOS.
   */
  apple?: {
    /** apple-mobile-web-app-capable */
    mobileWebAppCapable?: boolean;
    /** apple-mobile-web-app-status-bar-style */
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
    /** apple-mobile-web-app-title */
    title?: string;
    /** apple-itunes-app */
    itunesApp?: {
      appId: string;
      affiliateData?: string;
      appArgument?: string;
    };
  };

  /**
   * Microsoft-specific meta tags.
   */
  microsoft?: {
    /** msapplication-TileColor */
    tileColor?: string;
    /** msapplication-config - browserconfig.xml path */
    config?: string;
  };

  // ============================================================================
  // EXTENSIBILITY
  // ============================================================================

  /**
   * Additional custom meta tags.
   */
  customMeta?: Array<{
    name?: string;
    property?: string;
    httpEquiv?: string;
    content: string;
  }>;
}

export default PageProperties;
