import { Todo } from "./Todo";
import type { Computed } from "signia";
import type { TodoType } from "./TodoForm";

type TodoListProps = {
  todos: Computed<Array<TodoType>, unknown>;
  deleteTodo: (id: number) => void;
  changeStatus: (id: number) => void;
};

export const TodoList = ({
  todos,
  deleteTodo,
  changeStatus,
}: TodoListProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {todos &&
        todos.value.map((data) => (
          <Todo
            key={data.id}
            {...data}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
          />
        ))}
    </div>
  );
};
