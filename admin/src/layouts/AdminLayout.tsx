import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import Sidebar from "../components/Sidebar/Sidebar";
import PageHeader from "../components/PageHeader/PageHeader";
import SidebarMobileDrawer from "../components/Sidebar/SidebarMobile";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Tutup sidebar mobile kalau resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  // Tutup sidebar mobile otomatis saat route berubah (klik menu/submenu)
  useEffect(() => {
    if (window.innerWidth < 768 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen">
      <div className="surface-color border-r border-[#161618] hidden md:block">
        <Sidebar />
      </div>

      <SidebarMobileDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <div className="surface-color border-b border-l-2 border-[#161618]">
          <AppBar />
        </div>
        <PageHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-6 bg-gradient-to-br from-[#0d0e0f] to-[#1a1c1d] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
