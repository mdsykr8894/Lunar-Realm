// src/components/UserDrawer/UserDrawer.tsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, User as UserIcon, LogOut } from "lucide-react";
import Button from "../Button/Button";
import UserDrawerLinks from "./UserDrawerLinks";
import { logout } from "../../api/authService";
import { useNavigate } from "react-router-dom";

type UserDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
  role?: string;
  onLogout: () => void;
};

const drawerVariants = {
  hidden: { x: "100%", opacity: 0, scale: 0.98 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.15, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const UserDrawer: React.FC<UserDrawerProps> = ({
  isOpen,
  onClose,
  username,
  role,
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      onClose();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 w-full sm:w-96 h-full surface-color z-50 shadow-xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="border-b border-[#2a2a2a] h-16 px-6 flex items-center justify-between">
              <motion.button
                whileHover={{ x: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                aria-label="Close drawer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <div className="flex-1 text-center text-sm text-gray-500" />
              <div style={{ width: "24px" }} />
            </div>

            <div className="flex-grow flex flex-col overflow-y-auto">
              <div className="flex flex-col items-center px-5 py-10">
                <motion.div
                  className="w-20 h-18 rounded-full background-color flex items-center justify-center mb-3"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <UserIcon className="w-10 h-10 text-white" />
                </motion.div>
                <div className="text-white text-sm font-semibold text-center">
                  {role === "super_admin" ? (
                    <>
                      <span className="text-[#fcefbf]">Super Admin</span>{" "}
                      {username}
                    </>
                  ) : role === "admin" ? (
                    <>
                      <span className="text-[#fcefbf]">Admin</span> {username}
                    </>
                  ) : (
                    username
                  )}
                </div>
              </div>

              <UserDrawerLinks onClose={onClose} role={role} />
            </div>

            {/* Logout Button */}
            <div className="mt-auto px-4 pb-6">
              <div className="max-w-[300px] w-full mx-auto">
                <Button
                  variant="custom"
                  className="cursor-pointer w-full"
                  onClick={handleLogout} // gunakan handleLogout baru
                >
                  <LogOut className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserDrawer;
