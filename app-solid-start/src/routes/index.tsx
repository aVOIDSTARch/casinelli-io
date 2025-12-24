import HomePage from '~/components/homepage';
import { testHomePageProps } from '~/components/homepage/testData';

export default function Home() {
  return <HomePage {...testHomePageProps} />;
}
