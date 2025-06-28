// src/components/ui/Select.tsx

import React from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

const Select = ({ label, options, ...props }: SelectProps) => (
  <div className="space-y-1">
    {label && <label className="block text-sm">{label}</label>}
    <select
      {...props}
      className="w-full p-2 rounded bg-gray-800 border border-gray-600"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
