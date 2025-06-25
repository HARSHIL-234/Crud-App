import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const Modal = ({ onClose, isOpen, children }) => {
  const modalRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="relative w-full max-w-lg mx-4 rounded-2xl bg-white/30 dark:bg-neutral-900/60 border border-white/30 dark:border-neutral-700/60 shadow-2xl backdrop-blur-lg p-8 focus:outline-none"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            aria-modal="true"
            role="dialog"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <AiOutlineClose />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};

export default Modal;
