import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../Form/InputField";
import Button from "../Button/Button";
import { login, getProfile, logout } from "../../api/authService";
import logo from "../../assets/Logo.png";
import AlertMessage from "../Alert/AlertMessage";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);

      const profile = await getProfile();

      if (profile.role === "admin" || profile.role === "super_admin") {
        navigate("/admin/dashboard");
      } else {
        await logout();
        setError("Admin access only");
      }
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-color text-white shadow-xl relative
        w-full h-full p-6 mx-0 flex flex-col justify-center items-center
        rounded-none md:rounded-lg md:w-[460px] md:h-[560px] md:mx-4
        md:p-8 md:pt-10 md:pb-12 md:border md:border-[#2a2a2a] md:items-stretch"
    >
      <div className="flex flex-col items-center justify-center space-y-2 mb-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-white font-saira tracking-wide">
            Lunar Admin
          </span>
        </div>
        <p className="text-xs text-gray-400">Admin access only</p>
      </div>

      <AlertMessage
        message={error}
        show={!!error}
        type="error"
        containerClassName="w-full max-w-sm mx-auto mb-4"
        className="text-sm"
        onClose={() => setError("")}
      />

      <div className="space-y-4 w-full max-w-sm mx-auto">
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff
                  size={20}
                  className="text-gray-400 cursor-pointer hover:text-gray-300 transition-colors duration-200"
                />
              ) : (
                <Eye
                  size={20}
                  className="text-gray-400 cursor-pointer hover:text-gray-300 transition-colors duration-200"
                />
              )}
            </button>
          }
        />

        <div className="flex justify-end">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-xs text-gray-400 cursor-pointer select-none
              hover:text-gray-300 transition-colors duration-200"
          >
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-base rounded-md gap-2 cursor-pointer"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
