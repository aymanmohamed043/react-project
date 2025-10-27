import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchUserTodos(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  );
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
}

function UserTodos({ userId }) {
  const [completedTodos, setCompletedTodos] = useState({});

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos", userId],
    queryFn: () => fetchUserTodos(userId),
  });

  if (isLoading) return <div className="loading-text">Loading to-dos...</div>;
  if (error) return <div className="error-text">Error loading to-dos</div>;

  const toggleTodo = (todoId, currentStatus) => {
    setCompletedTodos((prev) => ({
      ...prev,
      [todoId]: currentStatus,
    }));
  };

  return (
    <div className="todos-list">
      {todos.map((todo) => {
        const isCompleted = completedTodos[todo.id] ?? todo.completed;

        return (
          <div
            key={todo.id}
            className={`todo-item ${isCompleted ? "completed" : ""}`}
            onClick={() => toggleTodo(todo.id, !isCompleted)}
          >
            <div className="todo-checkbox">{isCompleted ? "✓" : ""}</div>
            <span className="todo-text">{todo.title}</span>
          </div>
        );
      })}
    </div>
  );
}

export default UserTodos;
