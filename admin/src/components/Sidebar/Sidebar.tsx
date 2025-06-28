import { ChevronRight } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";
import logo from "../../assets/Logo.png";

interface SidebarProps {
  onClose?: () => void; // optional untuk mobile
}

const Sidebar = ({ onClose }: SidebarProps) => {
  return (
    <aside className="w-64 text-white h-full ">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold font-saira tracking-wide">
            Lunar Admin
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white text-xl font-bold md:hidden"
            aria-label="Close sidebar"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="border-b-2 border-[#2a2a2a] mx-4" />

      <nav className="mt-4 space-y-2 px-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
