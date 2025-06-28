import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Menu } from "lucide-react";

type PageHeaderProps = {
  onMenuClick: () => void;
};

const PageHeader: React.FC<PageHeaderProps> = ({ onMenuClick }) => {
  return (
    <>
      <div className="h-12 flex items-center justify-between px-6 surface-color border-t border-l-2 border-[#161618]">
        <div className="flex items-center space-x-3">
          <div className="md:hidden">
            <Menu
              size={18}
              className="text-white cursor-pointer"
              onClick={onMenuClick} // gunakan dari props
            />
          </div>
          <Breadcrumbs />
        </div>
        <div className="hidden md:flex items-center space-x-2" />
      </div>
    </>
  );
};

export default PageHeader;
