import { useNavigate } from "react-router-dom";

function DashboardCard({ title, description, icon, link, color, disabled }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Only navigate if not disabled and link is valid
    if (!disabled && link !== "#") {
      navigate(link);
    }
  };

  const getIcon = () => {
    if (icon === "users") {
      return (
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
      );
    }
    if (icon === "feature2") {
      return (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    }
    return (
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    );
  };

  return (
    <div
      className={`dashboard-card dashboard-card-${color} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleClick}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <div className="card-icon">{getIcon()}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-arrow">{disabled ? "🔒" : "→"}</div>
    </div>
  );
}

export default DashboardCard;
