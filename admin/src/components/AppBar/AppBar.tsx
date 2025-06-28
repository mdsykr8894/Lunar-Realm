import { useEffect, useState } from "react";
import { getProfile } from "../../api/authService";
import SearchBar from "../SearchBar/SearchBar";
import UserDrawer from "../UserDrawer/UserDrawer";
import { useNavigate } from "react-router-dom";
import AppBarActions from "./AppBarActions";
import AppBarContainer from "./AppBarContainer";
import logo from "../../assets/Logo.png";

const allowedRoles = ["admin", "super_admin"];

const AppBar = () => {
  const [isUserDrawerOpen, setUserDrawerOpen] = useState(false);
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

  const handleLogout = () => {
    console.log("Logged out");
    setUserDrawerOpen(false);
  };

  if (loading) return null;

  return (
    <>
      <AppBarContainer>
        <div className="flex items-center space-x-4 flex-1">
          {/* Logo + Title for mobile only */}
          <div className="flex items-center h-16 space-x-2 px-2 md:hidden">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="text-lg text-white font-semibold font-saira tracking-wide">
              Lunar Admin
            </span>
          </div>

          {/* SearchBar (responsive) */}
          <div className="hidden md:block w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        <AppBarActions onUserClick={() => setUserDrawerOpen(true)} />
      </AppBarContainer>

      <UserDrawer
        isOpen={isUserDrawerOpen}
        onClose={() => setUserDrawerOpen(false)}
        username={username}
        role={role}
        onLogout={handleLogout}
      />
    </>
  );
};

export default AppBar;
