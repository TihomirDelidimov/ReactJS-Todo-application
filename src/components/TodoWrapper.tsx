import { useState } from "react";
import TodoItem from "./TodoItem";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TodoForm from "./TodoForm";

interface Props {
  todos: TodoItem[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, value: string) => void;
}

type Edit = {
  id: number;
  value: string;
};

/**
 * Non visual component
 * This component handles the display of all Todo items. It receives props such as 'todos' (an array of TodoItem), and functions like 'completeTodo', 'removeTodo', and 'updateTodo'.
 * It manages an 'edit' state using the useState hook to handle editing of Todo items.
 * If there is an 'edit' action in progress, it renders the TodoForm component to update the existing Todo item.
 * Otherwise, it renders the list of Todo items with complete and delete icons.
 */
function TodoWrapper({ todos, completeTodo, removeTodo, updateTodo }: Props) {
  const [edit, setEdit] = useState<Edit>({
    id: 0,
    value: "",
  });

  const submitUpdate = (newValue: string) => {
    updateTodo(edit.id, newValue);
    setEdit({
      id: 0,
      value: "",
    });
  };

  // If there is a Todo being updated, render the update TodoForm
  if (edit.id) {
    return (
      <TodoForm
        buttonName="update"
        onSubmit={(todo: TodoItem) => {
          submitUpdate(todo.text);
        }}
      ></TodoForm>
    );
  }

  // Renders all available TODOs
  return todos.map((todo, index) => {
    // Mandatory to have the brackets. This will proce ReactNode object
    return (
      <div
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div
          key={todo.id}
          style={{ cursor: "pointer" }}
          onClick={() => completeTodo(todo.id)}
        >
          {todo.text}
        </div>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          ></RiCloseCircleLine>
          <TiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="edit-icon"
          ></TiEdit>
        </div>
      </div>
    );
  });
}

export default TodoWrapper;
