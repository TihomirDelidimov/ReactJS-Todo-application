import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoWrapper from "./TodoWrapper";

/**
 * This component manages the overall Todo list.
 * It uses the useState hook to manage the 'todos' array, which holds all the Todo items.
 * It includes functions to handle adding, completing, removing, and updating Todo items.
 * It renders the TodoForm and TodoWrapper components to facilitate the addition and management of Todo items.
 */
function TodoList() {
  // create 'todos' array of type 'Todo'. Contains the state of all Todo items
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Handles the addition of a new Todo item
  const handleAddTodo = (todo: TodoItem) => {
    // if there is no letter entered, do not add a todo
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    // concatenate the Todo item with the Todos array;
    const newAndOldTodos = [todo, ...todos];
    setTodos(newAndOldTodos);
    // !!! We can't print the 'todos' array, because the setTodos works asynchronously. This means that the updated state might not be available yet when the print is called.
    // console.log(todos);
    console.log(newAndOldTodos);
  };

  const handleCompleteTodo = (id: number) => {
    console.log("complete todo");
    let updatedTodos = todos.map((todo) => {
      if (todo.id == id) {
        // toggle
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (todoId: number) => {
    const removeArr = todos.filter((todo) => todo.id !== todoId);
    setTodos(removeArr);
  };

  const handleUpdateTodo = (todoId: number, newValue: string) => {
    // if there is no letter entered, do not update the todo
    if (!newValue || /^\s*$/.test(newValue)) {
      return;
    }

    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.text = newValue;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      {/* On every submbit of the form, a new Todo item is being created */}
      <TodoForm buttonName="Add" onSubmit={handleAddTodo}></TodoForm>
      {/* Non-visual component that wraps the functionallity of CUD Todo item operations */}
      <TodoWrapper
        todos={todos}
        completeTodo={handleCompleteTodo}
        removeTodo={handleRemoveTodo}
        updateTodo={handleUpdateTodo}
      ></TodoWrapper>
    </div>
  );
}

export default TodoList;
