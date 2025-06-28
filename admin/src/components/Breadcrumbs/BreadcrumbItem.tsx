import { Link } from "react-router-dom";

interface BreadcrumbItemProps {
  label: string;
  to?: string;
  isLast?: boolean;
}

const BreadcrumbItem = ({ label, to, isLast = false }: BreadcrumbItemProps) => {
  if (isLast || !to) {
    return <span className="text-gray-300">{label}</span>;
  }

  return (
    <Link to={to} className="text-[#fcefbf] hover:underline">
      {label}
    </Link>
  );
};

export default BreadcrumbItem;
