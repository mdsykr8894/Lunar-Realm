export const dynamicBreadcrumbs = [
  {
    pattern: "/admin/management/users/create",
    crumbs: [
      { label: "Management" },
      { label: "User", to: "/admin/management/users" },
      { label: "Create" },
    ],
  },
  {
    pattern: "/admin/management/users/:id/edit",
    crumbs: [
      { label: "Management" },
      { label: "User", to: "/admin/management/users" },
      { label: "Edit" },
    ],
  },
  {
    pattern: "/admin/management/users/:id",
    crumbs: [
      { label: "Management" },
      { label: "User", to: "/admin/management/users" },
      { label: "Detail" },
    ],
  },
  // 🆕 Contoh untuk masa depan
  {
    pattern: "/admin/management/media/:id",
    crumbs: [
      { label: "Management" },
      { label: "Media", to: "/admin/management/media" },
      { label: "Detail" },
    ],
  },
];
