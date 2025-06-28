// src/components/SearchBar/SearchBar.tsx
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-11 pr-4 py-2 text-[14px]
        rounded-xl background-color text-gray-300 
        placeholder-gray-400 border border-[#3a3b3d]
        hover:border-[#fcefbf] focus:border-[#fcefbf]
        focus:outline-none transition duration-300"
      />
      <Search
        className="absolute left-3 top-2.5 text-gray-300 pointer-events-none transition duration-300"
        size={20}
      />
    </div>
  );
};

export default SearchBar;
