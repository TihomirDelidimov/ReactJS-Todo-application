import TodoList from "./components/TodoList";
import "./App.css";

/**
 * This is the main application file that renders the TodoList component within a basic layout.
 */
function App() {
  return (
    <>
      {/* Entry point for the TODO app */}
      <div className="todo-app">
        <h1>What's the Plan for Today?</h1>
        <TodoList></TodoList>
      </div>
    </>
  );
}

export default App;
