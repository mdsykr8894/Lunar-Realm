import React from "react";
import clsx from "clsx";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table = ({ children, className }: TableProps) => {
  return (
    <div
      className={clsx(
        "overflow-x-auto surface-color rounded-t-xl rounded-b-none",
        className
      )}
    >
      <table className="table-auto min-w-full text-sm text-gray-300">
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <thead className="text-left text-white surface-color border-b-2 border-[#161618]">
    {children}
  </thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr>{children}</tr>
);

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <td className={clsx("py-4 px-6", className)}>{children}</td>;

const TableHeaderCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th className={clsx("py-4 px-6 font-semibold", className)}>{children}</th>
);

// Nested assignment
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeaderCell = TableHeaderCell;

export default Table;
