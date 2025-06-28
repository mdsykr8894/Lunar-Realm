import { AlertCircle, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type AlertMessageProps = {
  message: string;
  show: boolean;
  type?: "error" | "success" | "warning";
  className?: string; // Untuk gaya teks
  containerClassName?: string; // Untuk gaya container
  onClose?: () => void;
  autoDismiss?: number;
};

const getStyles = (type: string) => {
  const baseClasses =
    "rounded-lg p-3 pr-10 shadow-lg flex items-start relative backdrop-blur-sm";

  switch (type) {
    case "success":
      return {
        container: `${baseClasses} bg-emerald-500/10 border border-emerald-500`,
        icon: "text-emerald-500",
        text: "text-emerald-500",
        iconComponent: <CheckCircle2 className="w-5 h-5 mt-0.5" />,
      };
    case "warning":
      return {
        container: `${baseClasses} bg-amber-500/10 border border-amber-500`,
        icon: "text-amber-500",
        text: "text-amber-500",
        iconComponent: <AlertTriangle className="w-5 h-5 mt-0.5" />,
      };
    case "error":
    default:
      return {
        container: `${baseClasses} bg-rose-500/10 border border-rose-500`,
        icon: "text-rose-500",
        text: "text-rose-500",
        iconComponent: <AlertCircle className="w-5 h-5 mt-0.5" />,
      };
  }
};

const AlertMessage = ({
  message,
  show: propsShow,
  type = "error",
  className = "",
  containerClassName = "",
  onClose,
  autoDismiss,
}: AlertMessageProps) => {
  const [internalShow, setInternalShow] = useState(true);
  const show = propsShow !== undefined ? propsShow : internalShow;
  const styles = getStyles(type);

  useEffect(() => {
    if (autoDismiss && show) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
        else setInternalShow(false);
      }, autoDismiss);
      return () => clearTimeout(timer); // clear jika unmount
    }
  }, [autoDismiss, show, onClose]);

  const handleClose = () => {
    if (onClose) onClose();
    else setInternalShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`${styles.container} ${containerClassName}`}
          role="alert"
        >
          <div className={`flex-shrink-0 ${styles.icon}`}>
            {styles.iconComponent}
          </div>
          <div className={`ml-3 ${styles.text}`}>
            <p className={`text-sm font-medium ${className}`}>{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close alert"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertMessage;
