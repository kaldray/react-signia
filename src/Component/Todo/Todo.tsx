import type { TodoType } from "./TodoForm";

type TodoProps = {
  deleteTodo: (id: number) => void;
  changeStatus: (id: number) => void;
};

export const Todo = ({
  status,
  title,
  id,
  deleteTodo,
  changeStatus,
}: TodoType & TodoProps) => {
  return (
    <div className="flex p-5 flex-col gap-4 border-white rounded-md border-2">
      <p>{id}</p>
      <p>{title}</p>
      <p>{status}</p>
      <button onClick={() => deleteTodo(id)}>Delete</button>
      <button onClick={() => changeStatus(id)}>Toggle status</button>
    </div>
  );
};
