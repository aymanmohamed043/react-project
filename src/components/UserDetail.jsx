import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserPosts from "./UserPosts";
import UserTodos from "./UserTodos";
import "./UserDetail.css";

async function fetchUser(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">Error: {error.message}</div>;
  }

  return (
    <div className="user-detail-container">
      <button
        onClick={() => navigate("/dashboard/users")}
        className="back-button"
      >
        ← Back to Users
      </button>

      <div className="user-info-card">
        <div className="user-info-avatar">{user.name.charAt(0)}</div>
        <div className="user-info-details">
          <h1>{user.name}</h1>
          <p className="user-username">@{user.username}</p>
          <div className="user-contact">
            <span>📧 {user.email}</span>
            <span>📞 {user.phone}</span>
            <span>🌐 {user.website}</span>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`tab ${activeTab === "todos" ? "active" : ""}`}
            onClick={() => setActiveTab("todos")}
          >
            To-dos
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "posts" ? (
            <UserPosts userId={id} />
          ) : (
            <UserTodos userId={id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
