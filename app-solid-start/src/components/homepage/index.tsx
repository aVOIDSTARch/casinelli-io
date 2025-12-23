// This is the whole page to serve for the homepage

import { type Component } from "solid-js";
import HomeHeader from "./HomeHeader";
import HomeTitle from "./HomeTitle";

const titleText = "casinelli.io";
const styleClasses = {};

const HomePage: Component = () => {
  return (
    <>
      <HomeHeader />
      <HomeTitle title={titleText} />
    </>
  );
};

export default HomePage;
