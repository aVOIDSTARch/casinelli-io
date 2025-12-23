import { Component } from "solid-js";
import TestingDiv from "./testing-div";

interface TestProps {
    name?: string;
};


const TestPage: Component<TestProps> = (props) => {
    return <><TestingDiv name={ props.name } /></>;
};

export default TestPage;
