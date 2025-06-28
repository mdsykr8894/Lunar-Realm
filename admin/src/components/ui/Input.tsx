// src/components/ui/Input.tsx

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }: InputProps) => (
  <div className="space-y-1">
    {label && <label className="block text-sm">{label}</label>}
    <input
      {...props}
      className="w-full p-2 rounded bg-gray-800 border border-gray-600"
    />
  </div>
);

export default Input;
