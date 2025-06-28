import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "custom";
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const styles = {
    primary: {
      bg: "bg-[#fcefbf]",
      text: "text-black",
      hover: "hover:bg-[#F5D97D]",
      border: "",
      rounded: "",
    },
    secondary: {
      bg: "bg-gray-700",
      text: "text-white",
      hover: "hover:bg-gray-600",
      border: "",
      rounded: "",
    },
    custom: {
      bg: "bg-[#161618]",
      text: "text-white",
      hover: "hover:bg-[#2A2A2A]",
      border: "border border-[rgba(252,239,191,0.3)]",
      rounded: "rounded-md",
    },
  };

  const selected = styles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        w-full py-3 text-base font-semibold
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F5D97D]
        ${selected.bg} ${selected.text} ${selected.hover} ${selected.border} ${selected.rounded}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
