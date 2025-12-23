import { type Component } from "solid-js";

export interface TitleProps {
  title: string;
  stylesKV?: { [k: string]: boolean };
}



const HomeTitle: Component<TitleProps> = (props) => {
    return (
        <>
            <h1 classList={ props.stylesKV }>{ props.title }</h1>
        </>
    );
}

export default HomeTitle;
