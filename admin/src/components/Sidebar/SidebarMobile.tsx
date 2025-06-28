// src/components/Sidebar/SidebarMobileDrawer.tsx
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";

type SidebarMobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const drawerVariants = {
  hidden: { x: "-100%", opacity: 0, scale: 0.98 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.15, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const SidebarMobileDrawer = ({ isOpen, onClose }: SidebarMobileDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 left-0 h-full w-64 surface-color z-50 shadow-xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Sidebar onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarMobileDrawer;
