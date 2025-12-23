import { Component } from "solid-js";

interface Props {
  name?: string;
}

const TestingDiv: Component<Props> = (props) => {
  return <div>THIS IS A TEST DIV FOR TESTING PAGE { props.name }</div>;
};

export default TestingDiv;
