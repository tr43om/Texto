import { Reply } from "./Reply";
import { useCollection } from "../../hooks/useCollection";
import { AnimatePresence, motion } from "framer-motion";

export const RepliesList = ({ parentComment }) => {
  const { documents: replies } = useCollection(
    "replies",
    ["commentId", "==", parentComment.id],
    ["createdAt", "desc"]
  );

  return (
    <>
      {replies && (
        <AnimatePresence>
          {replies.map((reply) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: [0.25, 0.75, 0.5, 1.25] }}
            >
              <Reply id={reply.id} key={reply.id} comment={parentComment} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
};
