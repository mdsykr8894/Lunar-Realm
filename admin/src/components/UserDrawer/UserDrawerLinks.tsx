import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

type LinkItem = { to: string; label: string };
type UserDrawerLinksProps = { onClose: () => void; role?: string };

const UserDrawerLinks: React.FC<UserDrawerLinksProps> = ({ onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links: LinkItem[] = [
    { to: "/admin/me/profile", label: "My Profile" },
    { to: "/admin/me/change-password", label: "Change Password" },
    { to: "/admin/me/activity", label: "Activity Logs" },
    { to: "/lunar-realm", label: "Lunar Realm" },
  ];

  const linkClass = (path: string) =>
    `text-left transition duration-300 font-medium ${
      currentPath === path
        ? "text-[#fcefbf]"
        : "text-[#E3E3DB] hover:text-[#fcefbf]"
    }`;

  return (
    <div className="flex flex-col px-4 pt-6">
      <div className="flex flex-col space-y-4 max-w-[300px] mx-auto w-full text-[13px]">
        {links.map((link, i) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
          >
            <Link to={link.to} className={linkClass(link.to)} onClick={onClose}>
              {link.label}
            </Link>
            <div className="border-b border-[#2a2a2a] my-4 w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDrawerLinks;
