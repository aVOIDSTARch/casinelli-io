import { render } from "solid-js/web";
import {
  createSignal,
  createEffect,
  createMemo,
  Show,
  For,
  Index,
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

  return <div>Count: {count()}</div>;
}

render(() => <Counter />, document.getElementById("app"));
