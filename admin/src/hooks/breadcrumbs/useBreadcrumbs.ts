import { useLocation, matchPath } from "react-router-dom";
import { sidebarItems } from "../../components/Sidebar/sidebarItems";
import { dynamicBreadcrumbs } from "../../components/Breadcrumbs/dynamicBreadcrumbs";

type BreadcrumbSegment = {
  label: string;
  to?: string;
};

const findFromSidebar = (pathname: string): BreadcrumbSegment[] | null => {
  for (const item of sidebarItems) {
    if (item.to === pathname) {
      return [{ label: item.label, to: item.to }];
    }

    if (item.children) {
      for (const child of item.children) {
        if (child.to === pathname) {
          return [
            { label: item.label, to: undefined },
            { label: child.label, to: child.to },
          ];
        }
      }
    }
  }

  return null;
};

export const useBreadcrumbs = (): BreadcrumbSegment[] => {
  const { pathname } = useLocation();

  const sidebarTrail = findFromSidebar(pathname);
  if (sidebarTrail) return sidebarTrail;

  for (const { pattern, crumbs } of dynamicBreadcrumbs) {
    if (matchPath(pattern, pathname)) {
      return crumbs;
    }
  }

  return [];
};
