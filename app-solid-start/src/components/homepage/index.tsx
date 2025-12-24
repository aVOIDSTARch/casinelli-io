// This is the whole page to serve for the homepage

import { type Component } from "solid-js";
import HomeHeader from "./HomeHeader";
import HomeTitle from "./HomeTitle";
import { TitleProps } from './HomeTitle';
import { HomeHeaderProps } from "./HomeHeader";
import PageProperties from "~/types/PageProperties";



interface HomePageProps {
  pageProps: PageProperties;
  mainDivStylesKV: { [k: string]: boolean };
  headerProps: HomeHeaderProps;
  titleProps: TitleProps;
}

const HomePage: Component<HomePageProps> = (props) => {
  return (
    <div classList={ props.mainDivStylesKV }>
        <HomeHeader text={ props.headerProps.text} stylesKV={props.headerProps.stylesKV}/>
        <HomeTitle title={props.titleProps.title} stylesKV={props.titleProps.stylesKV} />
        <CardNavSection />>
    </div>
  );
};

export default HomePage;
