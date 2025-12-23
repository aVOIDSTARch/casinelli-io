import { render, Dynamic } from "solid-js/web";
import {
  createSignal,
  createEffect,
  createMemo,
  Show,
  For,
  Index,
  ErrorBoundary,
} from "solid-js";

function Counter() {
  // use createSignal to declare a reactive value
  const [count, setCount] = createSignal(0);
  // you can use the js setInterval() to periodically update this value
  setInterval(() => setCount(count() + 1), 1000);
  // to add side effects that occur when a value is changed use createEffect
  createEffect(() => {
    console.log("The count is now", count());
  });
  // you can create dependent expressions by wrapping them in a function
  // and it will also update when the original value changes
  const doubleCount = () => count() * 2;
  // you can prevent unnecessary updates to dependencies by using a memo
  const fib = createMemo(() => fibonacci(count()));

  // Control Flow with Show
  // The SHOW Component makes these conditionals super easy
  <Show
    // This conditional determines when the component is visible
    when={loggedIn()}
    // The FALLBACK prop acts as an else for the false condition
    fallback={<button onClick={toggle}>Log in</button>}
  >
    {" "}
    // This will execute when the condition is 'truthy'
    <button onClick={toggle}>Log out</button>
  </Show>;

  // The FOR Component takes an array to create a series of reactions
  // Reactive Array
  const [cats, setCats] = createSignal([
    { id: "J---aiyznGQ", name: "Keyboard Cat" },
    { id: "z_AbfPXTKms", name: "Maru" },
    { id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
  ]);
  // The FOR Component
  <>
    // The FOR Component
    <>
      <For each={cats()}>
        {(cat, i) => (
          <li>
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${cat.id}`}
            >
              {i() + 1}: {cat.name}
            </a>
          </li>
        )}
      </For>
    </>
    <>
      // In order to avoid excessive rerenders, use INDEX when dealing with
      primitives
      <Index each={cats()}>
        {(cat, i) => (
          <li>
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${cat().id}`}
            >
              {i + 1}: {cat().name}
            </a>
          </li>
        )}
      </Index>
    </>
  </>;

  // You can also use a switch style conditional as well
  const [x] = createSignal(7);
  // SWITCH and MATCH
  <>
    <Switch fallback={<p>{x()} is between 5 and 10</p>}>
      <Match when={x() > 10}>
        <p>{x()} is greater than 10</p>
      </Match>
      <Match when={5 > x()}>
        <p>{x()} is less than 5</p>
      </Match>
    </Switch>
  </>;

  // Sometimes you can reduce the switch to a Dynamic component
  //Declare the components and tie them to the options
  const RedThing = () => <strong style="color: red">Red Thing</strong>;
  const GreenThing = () => <strong style="color: green">Green Thing</strong>;
  const BlueThing = () => <strong style="color: blue">Blue Thing</strong>;

  const options = {
    red: RedThing,
    green: GreenThing,
    blue: BlueThing,
  };

  // Declare a reactive state variable for the options
  const [selected, setSelected] = createSignal("red");

  // Declare the selection box and use the DYNAMIC component to change between
  <>
    <select
      value={selected()}
      onInput={(e) => setSelected(e.currentTarget.value)}
    >
      <For each={Object.keys(options)}>
        {(color) => <option value={color}>{color}</option>}
      </For>
    </select>
    <Dynamic component={options[selected()]} />
  </>;

  // The Portal Component can help with items on different z-index when they don't render properly
  // This component allows you to control where and how it appears

  <Portal>
    <div class="popup">
      <h1>Popup</h1>
      <p>Some text you might need for something or other.</p>
    </div>
  </Portal>;

  //We can enclose components in an ErrorBoundary component to permit an alternative component to render
  //  when the intended one fails
  <ErrorBoundary fallback={(err) => err}>
    <Broken />
  </ErrorBoundary>;

  // LIFE CYCLE FUNCTIONS

  // onMount()
  // Performs the same way as an effect but only runs ONE TIME - once all initial rendering is done.
  onMount(async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=20`
    );
    setPhotos(await res.json());
  });
  // onCleanup()
  // Use it pretty much anywhere that is part of the synchronous execution of the reactive system.
  const timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));

  // This example shows how to use events in Solid
  const [pos, setPos] = createSignal({ x: 0, y: 0 });

  function handleMouseMove(event) {
    setPos({
      x: event.clientX,
      y: event.clientY,
    });
  }

  return (
    <div onMouseMove={handleMouseMove}>
      The mouse position is {pos().x} x {pos().y}
    </div>
  );

  // A simple example of using styles with Solid components
  {
    const [num, setNum] = createSignal(0);
    setInterval(() => setNum((num() + 1) % 255), 30);

    return (
      <div
        style={{
          color: `rgb(${num()}, 180, ${num()})`,
          "font-weight": 800,
          "font-size": `${num()}px`,
        }}
      >
        Some Text
      </div>
    );
  }

  // Use class to set the className property statically
  <button
    class={current() === 'foo' ? 'selected' : ''}
    onClick={() => setCurrent('foo')}
  >foo</button>

  // To change className property conditionally use this syntax
  import "./style.css";

  function App() {
    const [current, setCurrent] = createSignal("foo");

    return <>
      <button
        classList={{ selected: current() === 'foo' }}
        onClick={() => setCurrent('foo')}
      >foo</button>
      <button
        classList={{ selected: current() === 'bar' }}
        onClick={() => setCurrent('bar')}
      >bar</button>
      <button
        classList={{ selected: current() === 'baz' }}
        onClick={() => setCurrent('baz')}
      >baz</button>
    </>;

    // Uae the spread operator to pass a set of variable size parameters
    const pkg = {
      name: "solid-js",
      version: 1,
      speed: "⚡️",
      website: "https://solidjs.com",
    };

    function App() {
      return (
        <Info {...pkg} />
      );
    }

    // Directive
    import { onCleanup } from "solid-js";

    export default function clickOutside(el, accessor) {
      const onClick = (e) => !el.contains(e.target) && accessor()?.();
      document.body.addEventListener("click", onClick);

      onCleanup(() => document.body.removeEventListener("click", onClick));
    }

    // Using a custom directive
    import { createSignal, Show } from "solid-js";
    import clickOutside from "./click-outside";
    import "./style.css";

    function App() {
      const [show, setShow] = createSignal(false);

      return (
        <Show
          when={show()}
          fallback={<button onClick={(e) => setShow(true)}>Open Modal</button>}
        >
          <div class="modal" use:clickOutside={() => setShow(false)}>
            Some Modal
          </div>
        </Show>
      );
    }
    // Using Props with components

    // Default Props
    // You access them by props.propName
    // If you spread or deconstruct the props object you can lose reactivity
    // You can inline the defaults as below
    export default function Greeting(props) {
      return <h3>{props.greeting || "Hi"} {props.name || "John"}</h3>
    }
    // Or you can use mergeProps like this
    {
      const merged = mergeProps({ greeting: "Hi", name: "John" }, props);
      return <h3>{merged.greeting} {merged.name}</h3>
    }

    // To split off some props to pass down the tree to child components use splitProps like this
    export default function Greeting(props) {
      const [local, others] = splitProps(props, ["greeting", "name"]);
      return <h3 {...others}>{local.greeting} {local.name}</h3>
    }

    // When passing props down to child components use the children function to keep
    // from creating multiple copies of elements
    export default function ColoredList(props) {
      const c = children(() => props.children);
      return <>{c()}</>
    }
    // And then to update the elements
    createEffect(() => c().forEach(item => item.style.color = props.color));

    return <div>Count: {count()}</div>;
  }

  render(() => <Counter />, document.getElementById("app"))
}
