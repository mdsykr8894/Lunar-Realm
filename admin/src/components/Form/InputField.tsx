import React from "react";

type InputFieldProps = {
  label: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconRight?: React.ReactNode;
  required?: boolean;
  autoFocus?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  iconRight,
  required = false,
  autoFocus = false,
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoFocus={autoFocus}
          className="w-full text-xs background-color opacity-80 text-gray-400 placeholder-gray-400 p-4 rounded-lg border border-[#3a3b3d] focus:border-[#fcefbf] outline-none transition-colors duration-300"
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {iconRight}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
