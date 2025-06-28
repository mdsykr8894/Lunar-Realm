// src/components/AppBar/AppBarContainer.tsx
import type { ReactNode } from "react";

interface AppBarContainerProps {
  children: ReactNode;
}

const AppBarContainer = ({ children }: AppBarContainerProps) => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-4 shadow-md">
      {children}
    </div>
  );
};

export default AppBarContainer;
