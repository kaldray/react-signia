import "./App.css";
import { TodoList } from "./Component/Todo/TodoList";
import { TodoForm, type TodoType } from "./Component/Todo/TodoForm";
import { useAtom, useComputed } from "signia-react";

function App() {
  const todos = useAtom<Array<TodoType>>("todos", []);
  const todo = useAtom("todo", "");
  const status = useAtom<"todo" | "done">("todo_status", "todo");
  const filteredTodos = useComputed(
    "filteredTodos",
    () => todos.value.filter((v) => v.status === status.value),
    [todos.value],
  );

  const deleteTodo = (id: number) => {
    todos.set(todos.value.filter((val) => val.id !== id));
  };

  const changeStatus = (id: number) => {
    const updatedTodo = todos.value.map((val) => {
      if (val.id == id && val.status === "done") {
        val.status = "todo";
      } else if (val.id == id && val.status === "todo") {
        val.status = "done";
      }
      return { ...val };
    });
    todos.set(updatedTodo);
  };

  const toggleGlobalStatus = () => {
    status.value === "done" ? status.set("todo") : status.set("done");
  };
  const deleteAll = () => {
    todos.set([]);
  };

  return (
    <>
      <div className="flex gap-5 justify-center my-5">
        <button onClick={() => toggleGlobalStatus()}>Toggle Status</button>
        <button onClick={() => deleteAll()}>Delete All</button>
      </div>
      <p>Show {status.value} Todo</p>
      <p>Number item on list {filteredTodos.value.length}</p>
      <TodoForm todo={todo} todos={todos}>
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          changeStatus={changeStatus}
        />
      </TodoForm>
    </>
  );
}

export default App;
