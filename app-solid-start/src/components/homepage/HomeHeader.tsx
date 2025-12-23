import { type Component } from "solid-js";

interface HomeHeaderProps {
  text?: string;
  stylesKV?: { [k: string]: boolean };
}

const HomeHeader: Component<HomeHeaderProps> = (props) => {
  return (
    <>
      <header classList={props.stylesKV} >{props.text}</header>
    </>
  );
};

export default HomeHeader;
