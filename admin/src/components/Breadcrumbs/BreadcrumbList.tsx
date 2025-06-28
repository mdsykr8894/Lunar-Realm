import BreadcrumbItem from "./BreadcrumbItem";

interface Segment {
  label: string;
  to?: string;
}

interface Props {
  segments: Segment[];
}

const BreadcrumbList = ({ segments }: Props) => {
  return (
    <nav className="text-xs text-white">
      <ol className="flex space-x-2 items-center">
        <li className="flex items-center space-x-2">
          <BreadcrumbItem label="Admin" to="/admin/dashboard" />
          {segments.length > 0 && <span className="text-gray-500">/</span>}
        </li>

        {segments.map((seg, index) => {
          const isLast = index === segments.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <BreadcrumbItem
                label={seg.label}
                to={!isLast ? seg.to : undefined}
                isLast={isLast}
              />
              {!isLast && <span className="text-gray-500">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbList;
