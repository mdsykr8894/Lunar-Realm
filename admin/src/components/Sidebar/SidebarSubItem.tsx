// src/components/Sidebar/SidebarSubItem.tsx
import { Link, useLocation } from "react-router-dom";

type SidebarSubItemProps = {
  label: string;
  to: string;
};

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({ label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center py-1.5 px-2 text-sm rounded-md transition-colors duration-150 ${
        isActive ? "text-[#fcefbf]" : "text-[#999] hover:text-[#fcefbf]"
      }`}
    >
      <span className="pl-11">{label}</span>
    </Link>
  );
};

export default SidebarSubItem;
