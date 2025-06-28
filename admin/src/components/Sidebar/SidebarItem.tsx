// src/components/Sidebar/SidebarItem.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarSubItem from "./SidebarSubItem";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type SidebarItemProps = {
  label: string;
  to?: string;
  icon?: React.ElementType;
  children?: { label: string; to: string }[];
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  to,
  icon: Icon,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isParent = Array.isArray(children) && children.length > 0;

  const isActive = isParent
    ? children?.some((child) => location.pathname.startsWith(child.to))
    : location.pathname === to;

  useEffect(() => {
    if (
      isParent &&
      children?.some((child) => location.pathname.startsWith(child.to))
    ) {
      setOpen(true);
    }
  }, [location.pathname, children, isParent]);

  const handleClick = () => {
    if (isParent) setOpen((prev) => !prev);
  };

  const iconColor = isActive ? "#fcefbf" : "#ccc";

  return (
    <div className="space-y-1">
      <div
        className="flex items-center justify-between py-2 px-2 rounded-lg cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-4 pl-2">
          {Icon && <Icon size={18} color={iconColor} />}{" "}
          {/* <-- passing color */}
          {to ? (
            <Link
              to={to}
              className={`text-sm font-medium transition-colors duration-150 ${
                isActive ? "text-[#fcefbf]" : "text-[#ccc] hover:text-[#fcefbf]"
              }`}
            >
              {label}
            </Link>
          ) : (
            <span
              className={`text-sm font-medium transition-colors duration-150 ${
                isActive ? "text-[#fcefbf]" : "text-[#ccc] hover:text-[#fcefbf]"
              }`}
            >
              {label}
            </span>
          )}
        </div>
        {isParent && (
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mr-2"
          >
            <ChevronRight size={16} color={iconColor} />
          </motion.div>
        )}
      </div>

      {/* Subitems */}
      <AnimatePresence>
        {open && isParent && (
          <motion.div
            className="space-y-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children!.map((child) => (
              <SidebarSubItem key={child.to} {...child} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarItem;
