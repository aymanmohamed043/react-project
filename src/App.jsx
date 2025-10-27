import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import NoteManager from "./components/NoteManager";
import Analytics from "./components/Analytics";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/dashboard/users"
        element={isAuthenticated ? <UsersList /> : <Navigate to="/" />}
      />

      <Route
        path="/users/:id"
        element={isAuthenticated ? <UserDetail /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/notes"
        element={isAuthenticated ? <NoteManager /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/analytics"
        element={isAuthenticated ? <Analytics /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/weather"
        element={isAuthenticated ? <Weather /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
