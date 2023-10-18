import { FormEvent, useState, ChangeEvent, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";

interface Props {
  // Parametrizing the button name so the form becomes reusable for adding and updating todos
  buttonName: string;
  onSubmit: (todo: TodoItem) => void;
}

/**
 * This component is responsible for rendering the form to add or update Todo items.
 * It uses the useState hook to manage the 'input' state, which represents the value of the input field.
 * It also uses the useRef hook to manage the focus on the input field.
 * It includes event handlers for input change and form submission.
 */
function TodoForm({ buttonName, onSubmit }: Props) {
  // variable to save the state of the input HTML element
  const [input, setInput] = useState("");

  // Specifiying the HTMLInputElement type is needed because we won't be able to use the 'focus' method otherwise.
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  // Updates the state of the 'input' variable on every change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // event handler for Form submit event. Takes the value from the 'input' variable and adds the new Todo item
  const handleSubmit = (e: FormEvent) => {
    // Prevents browser from refreshing
    e.preventDefault();

    // this subbit is actually the 'handleAddTodo' arrow function defined in TodoList
    onSubmit({
      id: Math.floor(Math.random() * 10000),
      // takes the value from the input HTML element
      text: input,
      isComplete: false,
    });

    // clear the input element
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        placeholder="Add a todo"
        value={input}
        onChange={handleChange}
        name="text"
        className="todo-input edit"
        ref={inputRef}
      />
      <button onClick={handleSubmit} className="todo-button">
        {buttonName}
      </button>
    </form>
  );
}

export default TodoForm;
