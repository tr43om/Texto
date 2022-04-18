// components
import { Comment } from "./Comment";

// styles
import "./CommentsList.scss";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { AnimatePresence, motion } from "framer-motion";

export const CommentsList = () => {
  const {
    documents: comments,
    error,
    isPending,
  } = useCollection("comments", null, ["createdAt"]);

  return (
    <div className="comments container">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {comments && (
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: [0.25, 0.75, 0.5, 1.25] }}
            >
              <Comment id={comment.id} comment={comment} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};
