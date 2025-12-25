import { type Component, For, Show, mergeProps } from 'solid-js';
import { Title, Meta, Link } from '@solidjs/meta';
import type { PageProperties } from '~/types/PageProperties';

export interface PageMetaDataProps {
  pageProps?: PageProperties;
}

const defaultProps: Required<PageMetaDataProps> = {
  pageProps: {
    title: 'Casinelli.io',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    lang: 'en',
    description: 'Welcome to Casinelli.io',
  },
};

const PageMetaData: Component<PageMetaDataProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const p = () => props.pageProps;

  return (
    <>
      {/* Required title */}
      <Title>{p().title}</Title>

      {/* Basic meta tags */}
      <Show when={p().description}>
        <Meta name="description" content={p().description} />
      </Show>
      <Show when={p().author}>
        <Meta name="author" content={p().author} />
      </Show>
      <Show when={p().keywords?.length}>
        <Meta name="keywords" content={p().keywords!.join(', ')} />
      </Show>
      <Show when={p().generator}>
        <Meta name="generator" content={p().generator} />
      </Show>
      <Show when={p().applicationName}>
        <Meta name="application-name" content={p().applicationName} />
      </Show>
      <Show when={p().themeColor}>
        <Meta
          name="theme-color"
          content={
            typeof p().themeColor === 'string'
              ? (p().themeColor as string)
              : (p().themeColor as { light: string; dark: string }).light
          }
        />
      </Show>
      <Show when={p().colorScheme}>
        <Meta name="color-scheme" content={p().colorScheme} />
      </Show>
      <Show when={p().referrerPolicy}>
        <Meta name="referrer" content={p().referrerPolicy} />
      </Show>

      {/* Open Graph */}
      <Show when={p().openGraph}>
        <Show when={p().openGraph!.title}>
          <Meta property="og:title" content={p().openGraph!.title} />
        </Show>
        <Show when={p().openGraph!.description}>
          <Meta property="og:description" content={p().openGraph!.description} />
        </Show>
        <Show when={p().openGraph!.image}>
          <Meta property="og:image" content={p().openGraph!.image} />
        </Show>
        <Show when={p().openGraph!.imageAlt}>
          <Meta property="og:image:alt" content={p().openGraph!.imageAlt} />
        </Show>
        <Show when={p().openGraph!.imageWidth}>
          <Meta property="og:image:width" content={String(p().openGraph!.imageWidth)} />
        </Show>
        <Show when={p().openGraph!.imageHeight}>
          <Meta property="og:image:height" content={String(p().openGraph!.imageHeight)} />
        </Show>
        <Show when={p().openGraph!.url}>
          <Meta property="og:url" content={p().openGraph!.url} />
        </Show>
        <Show when={p().openGraph!.type}>
          <Meta property="og:type" content={p().openGraph!.type} />
        </Show>
        <Show when={p().openGraph!.siteName}>
          <Meta property="og:site_name" content={p().openGraph!.siteName} />
        </Show>
        <Show when={p().openGraph!.locale}>
          <Meta property="og:locale" content={p().openGraph!.locale} />
        </Show>
      </Show>

      {/* Twitter Card */}
      <Show when={p().twitter}>
        <Show when={p().twitter!.card}>
          <Meta name="twitter:card" content={p().twitter!.card} />
        </Show>
        <Show when={p().twitter!.site}>
          <Meta name="twitter:site" content={p().twitter!.site} />
        </Show>
        <Show when={p().twitter!.creator}>
          <Meta name="twitter:creator" content={p().twitter!.creator} />
        </Show>
        <Show when={p().twitter!.title}>
          <Meta name="twitter:title" content={p().twitter!.title} />
        </Show>
        <Show when={p().twitter!.description}>
          <Meta name="twitter:description" content={p().twitter!.description} />
        </Show>
        <Show when={p().twitter!.image}>
          <Meta name="twitter:image" content={p().twitter!.image} />
        </Show>
        <Show when={p().twitter!.imageAlt}>
          <Meta name="twitter:image:alt" content={p().twitter!.imageAlt} />
        </Show>
      </Show>

      {/* Article metadata */}
      <Show when={p().article}>
        <Show when={p().article!.publishedTime}>
          <Meta property="article:published_time" content={p().article!.publishedTime} />
        </Show>
        <Show when={p().article!.modifiedTime}>
          <Meta property="article:modified_time" content={p().article!.modifiedTime} />
        </Show>
        <Show when={p().article!.section}>
          <Meta property="article:section" content={p().article!.section} />
        </Show>
        <Show when={p().article!.author}>
          <Meta
            property="article:author"
            content={
              Array.isArray(p().article!.author)
                ? (p().article!.author as string[])[0]
                : (p().article!.author as string)
            }
          />
        </Show>
      </Show>

      {/* Robots */}
      <Show when={p().robots}>
        <Show when={p().robots!.robots}>
          <Meta name="robots" content={p().robots!.robots} />
        </Show>
        <Show when={p().robots!.googlebot}>
          <Meta name="googlebot" content={p().robots!.googlebot} />
        </Show>
      </Show>

      {/* Verification */}
      <Show when={p().verification}>
        <Show when={p().verification!.google}>
          <Meta name="google-site-verification" content={p().verification!.google} />
        </Show>
        <Show when={p().verification!.bing}>
          <Meta name="msvalidate.01" content={p().verification!.bing} />
        </Show>
      </Show>

      {/* Links */}
      <Show when={p().links?.canonical}>
        <Link rel="canonical" href={p().links!.canonical} />
      </Show>
      <Show when={p().links?.manifest}>
        <Link rel="manifest" href={p().links!.manifest} />
      </Show>

      {/* Custom meta tags */}
      <Show when={p().customMeta?.length}>
        <For each={p().customMeta}>
          {(meta) => (
            <Meta
              name={meta.name}
              property={meta.property}
              content={meta.content}
            />
          )}
        </For>
      </Show>
    </>
  );
};

export default PageMetaData;
