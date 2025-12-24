import HomePage from '~/components/homepage/homePageIndex';
import generateHomePageProps from '~/components/homepage/HomePagePropsGen';

// Use imported module function that creates
const homePageProps = generateHomePageProps;

export default function Home() {
  return <HomePage {...homePageProps} />;
}
