import BreadcrumbList from "./BreadcrumbList";
import { useBreadcrumbs } from "../../hooks/breadcrumbs/useBreadcrumbs";

const Breadcrumbs = () => {
  const segments = useBreadcrumbs();
  return <BreadcrumbList segments={segments} />;
};

export default Breadcrumbs;
