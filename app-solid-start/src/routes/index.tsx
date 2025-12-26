import { HomeLayout } from '~/components/layout';
import generateHomePageProps from '~/components/homepage/HomePagePropsGen';
import PageMetaData from '~/components/PageMetaData';
import HomePage from '~/components/homepage/homePageIndex';

export default function Home() {
  const homePageProps = generateHomePageProps();

  return (
    <>
      <PageMetaData pageProps={homePageProps.pageProps} />
      <HomeLayout fullWidth>
        <HomePage {...homePageProps} />
      </HomeLayout>
    </>
  );
}
