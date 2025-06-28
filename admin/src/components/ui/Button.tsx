// src/components/ui/Button.tsx

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => (
  <button
    {...props}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
  >
    {children}
  </button>
);

export default Button;
