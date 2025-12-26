import { type Component } from 'solid-js';
import HomeTitle, { type HomeTitleProps } from './HomeTitle';

export interface HomeHeaderProps {
  /** Optional plain text header (fallback) */
  text?: string;
  /** Class list for the header */
  stylesKV?: { [k: string]: boolean };
  /** Optional title props to render `HomeTitle` inside the header */
  titleProps?: HomeTitleProps;
}

const HomeHeader: Component<HomeHeaderProps> = (props) => {
  return (
    <header classList={props.stylesKV}>
      {props.titleProps ? (
        <HomeTitle title={props.titleProps.title} stylesKV={props.titleProps.stylesKV} />
      ) : (
        props.text
      )}
    </header>
  );
};

export default HomeHeader;
