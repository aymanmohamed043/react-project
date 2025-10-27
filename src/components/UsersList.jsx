import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "./UsersList.css";

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

function UsersList() {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-header">
        <button onClick={() => navigate("/dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
        <h2>Users List</h2>
      </div>

      <div className="users-grid">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-company">{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
