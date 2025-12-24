import { Show, type Component, createSignal } from "solid-js";
import { StylesKV } from "~/utils/stylesKV";

export interface NavCardProps {
  paraText?: string;
  paraStyles?: StylesKV;
  buttonText?: string;
  buttonStyles?: StylesKV;
  navCardStyles?: StylesKV;
}

const [show, setShow] = createSignal(false);

const NavCard: Component<NavCardProps> = (props) => {
  return (
    <section classList={props.navCardStyles}>
      <button classList={props.buttonStyles}>{props.buttonText}</button>
      <Show when={show()}>
        <p classList={props.paraStyles}>{props.paraText}</p>
      </Show>
    </section>
  );
};

export default NavCard;
