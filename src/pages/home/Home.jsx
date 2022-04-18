// components
import { CommentForm } from "./CommentForm";
import { CommentsList } from "./CommentsList";
import { Navbar } from "../../components/Navbar";

import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4, ease: [0.25, 0.75, 0.5, 1.25] }}
    >
      <Navbar />
      <CommentsList />
      <CommentForm />
    </motion.div>
  );
};
