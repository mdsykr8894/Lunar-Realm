import { useEffect, useState } from "react";
import { getProfile } from "../../../api/authService";
import { useNavigate } from "react-router-dom";

const allowedRoles = ["admin", "super_admin"];

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((data) => {
        if (!allowedRoles.includes(data.role)) {
          navigate("/login", { replace: true });
          return;
        }
        setUsername(data.username);
        setRole(data.role);
      })
      .catch((error) => {
        console.error("Failed to fetch profile:", error);
        navigate("/login", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center text-white mt-20">Loading dashboard...</div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

        <div className="surface-color shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Welcome, {username}</h2>
          <p className="text-gray-400">
            Role: <span className="font-medium text-white">{role}</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Novels" value="120" />
          <DashboardCard title="Total Chapters" value="1,540" />
          <DashboardCard title="Users Registered" value="320" />
          <DashboardCard title="Reports" value="5" />
        </div>
      </div>
    </div>
  );
};

type CardProps = {
  title: string;
  value: string;
};

const DashboardCard = ({ title, value }: CardProps) => (
  <div className="surface-color rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-200">
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-semibold text-white">{value}</p>
  </div>
);

export default Dashboard;
