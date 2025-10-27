import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./Analytics.css";

// Fetch functions
async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
}

function Analytics() {
  const navigate = useNavigate();

  // Fetch all data
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: todos, isLoading: todosLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const isLoading = usersLoading || postsLoading || todosLoading;

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalUsers = users?.length || 0;

  // Posts statistics
  const postsByUser = {};
  posts?.forEach((post) => {
    postsByUser[post.userId] = (postsByUser[post.userId] || 0) + 1;
  });

  const userWithMostPosts = Object.entries(postsByUser).reduce(
    (max, [userId, count]) =>
      count > max.count ? { userId: parseInt(userId), count } : max,
    { userId: null, count: 0 }
  );

  const userWithFewestPosts = Object.entries(postsByUser).reduce(
    (min, [userId, count]) =>
      count < min.count ? { userId: parseInt(userId), count } : min,
    { userId: null, count: Infinity }
  );

  // Todos statistics
  const todosByUser = {};
  const completedTodosByUser = {};

  todos?.forEach((todo) => {
    todosByUser[todo.userId] = (todosByUser[todo.userId] || 0) + 1;
    if (todo.completed) {
      completedTodosByUser[todo.userId] =
        (completedTodosByUser[todo.userId] || 0) + 1;
    }
  });

  const userWithMostCompletedTodos = Object.entries(
    completedTodosByUser
  ).reduce(
    (max, [userId, count]) =>
      count > max.count ? { userId: parseInt(userId), count } : max,
    { userId: null, count: 0 }
  );

  const userWithFewestCompletedTodos = Object.entries(
    completedTodosByUser
  ).reduce(
    (min, [userId, count]) =>
      count < min.count ? { userId: parseInt(userId), count } : min,
    { userId: null, count: Infinity }
  );

  // Helper function to get username
  const getUserName = (userId) => {
    const user = users?.find((u) => u.id === userId);
    return user ? user.username : "Unknown";
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <button onClick={() => navigate("/dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Simple Analytics</h1>
        <p className="subtitle">User statistics and summaries</p>
      </div>

      <div className="analytics-grid">
        {/* Total Users */}
        <div className="stat-card total-card">
          <div className="stat-icon">
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h2 className="stat-title">Total Users</h2>
          <p className="stat-number">{totalUsers}</p>
          <p className="stat-label">Registered users in system</p>
        </div>

        {/* Most Posts */}
        <div className="stat-card posts-max-card">
          <div className="stat-icon">
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="stat-title">Most Posts</h2>
          <p className="stat-username">
            {getUserName(userWithMostPosts.userId)}
          </p>
          <p className="stat-number">{userWithMostPosts.count}</p>
          <p className="stat-label">posts created</p>
        </div>

        {/* Fewest Posts */}
        <div className="stat-card posts-min-card">
          <div className="stat-icon">
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="stat-title">Fewest Posts</h2>
          <p className="stat-username">
            {getUserName(userWithFewestPosts.userId)}
          </p>
          <p className="stat-number">{userWithFewestPosts.count}</p>
          <p className="stat-label">posts created</p>
        </div>

        {/* Most Completed Todos */}
        <div className="stat-card todos-max-card">
          <div className="stat-icon">
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h2 className="stat-title">Most Completed Todos</h2>
          <p className="stat-username">
            {getUserName(userWithMostCompletedTodos.userId)}
          </p>
          <p className="stat-number">{userWithMostCompletedTodos.count}</p>
          <p className="stat-label">todos completed</p>
        </div>

        {/* Fewest Completed Todos */}
        <div className="stat-card todos-min-card">
          <div className="stat-icon">
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="stat-title">Fewest Completed Todos</h2>
          <p className="stat-username">
            {getUserName(userWithFewestCompletedTodos.userId)}
          </p>
          <p className="stat-number">{userWithFewestCompletedTodos.count}</p>
          <p className="stat-label">todos completed</p>
        </div>

        {/* Summary Card */}
        <div className="stat-card summary-card">
          <h2 className="stat-title">Quick Summary</h2>
          <div className="summary-list">
            <div className="summary-item">
              <span className="summary-label">Total Posts:</span>
              <span className="summary-value">{posts?.length || 0}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Todos:</span>
              <span className="summary-value">{todos?.length || 0}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Completed Todos:</span>
              <span className="summary-value">
                {todos?.filter((t) => t.completed).length || 0}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Completion Rate:</span>
              <span className="summary-value">
                {todos?.length > 0
                  ? Math.round(
                      (todos.filter((t) => t.completed).length / todos.length) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
