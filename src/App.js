import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./styles.css";
import { TodoList } from "./TodoList";

export default function App() {
  const [filter, setFilter] = useState("All"); // Add filter state

  //for local storage purpose
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  //to add a todo && flags
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  //to handel complted todo's by clicking check box
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  //to handle delete a toDo
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // Add a function to handle filter change
  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  // Filter todos based on the current filter
  const filteredTodos =
    filter === "All"
      ? todos
      : filter === "Complete"
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>

      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange("All")}
          className={filter === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("Complete")}
          className={filter === "Complete" ? "active" : ""}
        >
          Complete
        </button>
        <button
          onClick={() => handleFilterChange("Incomplete")}
          className={filter === "Incomplete" ? "active" : ""}
        >
          Incomplete
        </button>
      </div>
      <TodoList
        filteredTodos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}
