// src/components/AppBar/AppBarActions.tsx
import { Bell, Power, RefreshCw, User, Search } from "lucide-react";

interface AppBarActionsProps {
  onUserClick: () => void;
}

const AppBarActions = ({ onUserClick }: AppBarActionsProps) => {
  return (
    <div className="flex items-center space-x-4 p-2">
      {/* Hanya muncul di md+ */}
      <div className="hidden md:flex items-center space-x-4">
        <Bell
          className="text-gray-300 hover:text-[#fcefbf] cursor-pointer"
          size={20}
        />
        <RefreshCw
          className="text-gray-300 hover:text-[#fcefbf] cursor-pointer"
          size={20}
        />
        <Power
          className="text-gray-300 hover:text-[#fcefbf] cursor-pointer"
          size={20}
        />
      </div>

      {/* Search icon untuk mobile */}
      <div className="md:hidden">
        <Search
          className="text-gray-300 hover:text-[#fcefbf] cursor-pointer"
          size={20}
        />
      </div>

      {/* Icon user selalu terlihat */}
      <div
        className="w-8 h-8 rounded-full background-color flex items-center justify-center cursor-pointer"
        onClick={onUserClick}
      >
        <User className="text-white" size={18} />
      </div>
    </div>
  );
};

export default AppBarActions;
