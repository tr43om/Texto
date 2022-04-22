import "./Error.scss";
import { AnimatePresence, motion } from "framer-motion";
export const Error = ({ message }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="error"
        initial={{ opacity: 0, y: -100, x: -200 }}
        animate={{ opacity: 1, y: 0, x: -200 }}
        exit={{ opacity: 0, y: -100, x: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.75, 0.5, 1.25] }}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};
