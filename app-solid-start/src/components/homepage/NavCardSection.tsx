import { type Component } from "solid-js";
import NavCard from "./NavCard";

export interface NavCardSectionProps {
  navCardData: Array<Object>;
  sectionStyles: { [k: string]: boolean };
}

const HomeHeader: Component<HomeHeaderProps> = (props) => {
  return (
    <>
      <header classList={props.stylesKV}>{props.text}</header>
    </>
  );
};

export default HomeHeader;
