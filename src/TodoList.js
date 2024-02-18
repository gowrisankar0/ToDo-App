import { TodoItem } from "./TodoItem";

export function TodoList({  toggleTodo, deleteTodo, filteredTodos }) {
  //reverse order todo and map through the reversed order
  const reversedTodos = [...filteredTodos].reverse(); 
  return (
    <ul className="list">
      {reversedTodos.length === 0 && <h2>No Todos</h2>}
      {reversedTodos.map((todo) => (
        <TodoItem
          {...todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
