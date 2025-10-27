import DashboardCard from "../components/DashboardCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Choose a feature to get started</p>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="User & Posts Manager"
          description="Browse users, view their posts and manage to-dos"
          icon="users"
          link="/dashboard/users"
          color="blue"
        />

        <DashboardCard
          title="Note Manager"
          description="Create, organize and manage notes by priority"
          icon="feature2"
          link="/dashboard/notes"
          color="purple"
        />

        <DashboardCard
          title="Simple Analytics"
          description="View user statistics and summaries"
          icon="feature3"
          link="/dashboard/analytics"
          color="pink"
        />

        <DashboardCard
          title="Weather Widget"
          description="Check real-time weather for any city"
          icon="weather"
          link="/dashboard/weather"
          color="blue"
        />
      </div>
    </div>
  );
}

export default Dashboard;
