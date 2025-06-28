// src/components/Sidebar/sidebarItems.ts
import { LayoutDashboard, BookOpenText, Settings, Users } from "lucide-react";

// src/components/Sidebar/sidebarItems.ts

export const sidebarItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Content",
    icon: BookOpenText,
    children: [
      { label: "Novel", to: "/admin/contents/novels" },
      { label: "Chapter", to: "/admin/contents/chapters" },
      { label: "Genre", to: "/admin/contents/genres" },
      { label: "Tags", to: "/admin/contents/tags" },
      { label: "Language", to: "/admin/contents/languages" },
      { label: "Author", to: "/admin/contents/authors" },
      { label: "Status", to: "/admin/contents/status" },
    ],
  },
  {
    label: "Management",
    icon: Users,
    children: [
      { label: "User", to: "/admin/management/users" },
      { label: "Media", to: "/admin/management/media" },
    ],
  },
  {
    label: "Setting",
    to: "/admin/settings",
    icon: Settings,
  },
];
