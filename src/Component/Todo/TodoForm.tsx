import React, { useRef } from "react";
import { transact, type Atom } from "signia";
import { useAtom } from "signia-react";

export type TodoType = {
  title: string;
  status: "todo" | "done";
  id: number;
};

type TodoFormProps = {
  todo: Atom<string, unknown>;
  children: React.ReactNode;
  todos: Atom<TodoType[], unknown>;
};

export const TodoForm = ({ children, todo, todos }: TodoFormProps) => {
  const id = useAtom("id", 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (todo.value === "") return;
    transact(() => {
      todos.update((state) => [
        ...state,
        { status: "todo", title: todo.value, id: id.value },
      ]);
      id.update((prev) => prev + 1);
      todo.update((prev) => prev + "");
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <form
        action=""
        onSubmit={addTodo}
        className="my-5 flex flex-col w-3/4 mx-auto gap-5">
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => todo.set(e.target.value)}
          className="p-3"
        />
        <button className="w-48 self-center" type="submit">
          Add todo
        </button>
      </form>
      <section>{children}</section>
    </>
  );
};
