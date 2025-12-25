import { SiteLayout } from '~/components/layout';
import generateHomePageProps from '~/components/homepage/HomePagePropsGen';
import PageMetaData from '~/components/PageMetaData';
import AppsNavSection from '~/components/homepage/AppsNavSection';
import HomeFooter from '~/components/homepage/HomeFooter';

export default function Home() {
  const homePageProps = generateHomePageProps();

  return (
    <>
      <PageMetaData pageProps={homePageProps.pageProps} />
      <SiteLayout>
        <div class="home-content">
          <AppsNavSection
            title={homePageProps.appsNavSectionProps?.title}
            stylesKV={homePageProps.appsNavSectionProps?.stylesKV}
            navCardSectionProps={homePageProps.appsNavSectionProps?.navCardSectionProps}
          />
          <HomeFooter
            text={homePageProps.footerProps?.text}
            stylesKV={homePageProps.footerProps?.stylesKV}
            navCardSectionProps={homePageProps.footerProps?.navCardSectionProps}
          />
        </div>
      </SiteLayout>
    </>
  );
}
