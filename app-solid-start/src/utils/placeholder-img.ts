/**
 * Placeholder Image URL Generator
 * Generates URLs for placehold.co placeholder images
 */

export type ImageFormat = 'svg' | 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'avif';

export type PlaceholderFont =
  | 'lato'
  | 'lora'
  | 'montserrat'
  | 'noto-sans'
  | 'open-sans'
  | 'oswald'
  | 'playfair-display'
  | 'poppins'
  | 'pt-sans'
  | 'raleway'
  | 'roboto'
  | 'source-sans-pro';

export interface PlaceholderImageOptions {
  /** Image height in pixels (required, 10-4000) */
  height: number;
  /** Image width in pixels (optional, defaults to height for square) */
  width?: number;
  /** Image format (optional, defaults to webp) */
  format?: ImageFormat;
  /** Background color - hex without # or CSS color name (optional) */
  bgColor?: string;
  /** Text color - hex without # or CSS color name (required if bgColor is set) */
  textColor?: string;
  /** Custom text to display (optional, defaults to dimensions) */
  text?: string;
  /** Font family (optional, defaults to lato) */
  font?: PlaceholderFont;
  /** Retina multiplier: 2 or 3 (optional) */
  retina?: 2 | 3;
}

const BASE_URL = 'https://placehold.co';
const MIN_SIZE = 10;
const MAX_SIZE = 4000;

/**
 * Clamps a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Generates a placeholder image URL from placehold.co
 *
 * @param options - Configuration options for the placeholder image
 * @returns The complete placeholder image URL
 *
 * @example
 * // Square 200x200 webp
 * generatePlaceholderUrl({ height: 200 })
 * // => "https://placehold.co/200/webp"
 *
 * @example
 * // Rectangle with custom colors
 * generatePlaceholderUrl({ height: 400, width: 600, bgColor: '000000', textColor: 'ffffff' })
 * // => "https://placehold.co/600x400/000000/ffffff/webp"
 *
 * @example
 * // With custom text and font
 * generatePlaceholderUrl({ height: 300, text: 'Hello World', font: 'roboto' })
 * // => "https://placehold.co/300/webp?text=Hello+World&font=roboto"
 */
export function generatePlaceholderUrl(options: PlaceholderImageOptions): string {
  const {
    height,
    width,
    format = 'webp',
    bgColor,
    textColor,
    text,
    font,
    retina,
  } = options;

  // Clamp dimensions to valid range
  const h = clamp(Math.round(height), MIN_SIZE, MAX_SIZE);
  const w = width ? clamp(Math.round(width), MIN_SIZE, MAX_SIZE) : undefined;

  // Build dimension string
  let dimensions = w ? `${w}x${h}` : `${h}`;

  // Add retina suffix if specified
  if (retina) {
    dimensions += `@${retina}x`;
  }

  // Build path parts
  const pathParts: string[] = [dimensions];

  // Add colors if both are provided
  if (bgColor && textColor) {
    pathParts.push(bgColor);
    pathParts.push(textColor);
  }

  // Add format
  pathParts.push(format);

  // Build base URL
  let url = `${BASE_URL}/${pathParts.join('/')}`;

  // Build query params
  const queryParams: string[] = [];

  if (text) {
    // Replace spaces with + and encode other special chars
    const encodedText = encodeURIComponent(text).replace(/%20/g, '+');
    queryParams.push(`text=${encodedText}`);
  }

  if (font) {
    queryParams.push(`font=${font}`);
  }

  // Append query string if present
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  return url;
}

/**
 * Generates a square placeholder image URL
 * Convenience function for common square placeholder use case
 *
 * @param size - Size in pixels for both width and height
 * @param format - Image format (defaults to webp)
 * @returns The placeholder image URL
 */
export function generateSquarePlaceholder(
  size: number,
  format: ImageFormat = 'webp'
): string {
  return generatePlaceholderUrl({ height: size, format });
}

/**
 * Generates a placeholder with custom colors
 *
 * @param height - Image height
 * @param width - Image width (optional, defaults to height)
 * @param bgColor - Background color (hex without # or CSS name)
 * @param textColor - Text color (hex without # or CSS name)
 * @param format - Image format (defaults to webp)
 * @returns The placeholder image URL
 */
export function generateColoredPlaceholder(
  height: number,
  width: number | undefined,
  bgColor: string,
  textColor: string,
  format: ImageFormat = 'webp'
): string {
  return generatePlaceholderUrl({
    height,
    width,
    bgColor,
    textColor,
    format,
  });
}

export default generatePlaceholderUrl;
