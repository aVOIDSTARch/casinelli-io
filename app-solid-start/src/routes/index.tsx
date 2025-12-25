import HomePage from '~/components/homepage/homePageIndex';
import generateHomePageProps from '~/components/homepage/HomePagePropsGen';
import PageMetaData from '~/components/PageMetaData';

export default function Home() {
  const homePageProps = generateHomePageProps();

  return (
    <>
      <PageMetaData pageProps={homePageProps.pageProps} />
      <HomePage {...homePageProps} />
    </>
  );
}
