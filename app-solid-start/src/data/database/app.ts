import { supabase } from '../../utils/supabase'
import { createResource, For } from "solid-js";

async function getTodos() {
  const { data: todos } = await supabase.from("todos").select();
  return todos;
}

function App() {
  const [todos] = createResource(getTodos);

  return (
   null

  );
}
export default App;
