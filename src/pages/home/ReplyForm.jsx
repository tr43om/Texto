// styles
import "./CommentForm.scss";

// hooks
import { useRef, useState } from "react";

import { useFirestore } from "../../hooks/useFirestore";
import { useCurrentUser } from "../../hooks/useCurrentUser";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

export const ReplyForm = ({ replyTo, showReplyForm }) => {
  const [text, setText] = useState("");
  const { addDocument } = useFirestore("replies");

  const user = useCurrentUser();

  const input = useRef();
  const form = useRef();

  // Add reply
  const addReply = async (e) => {
    if (
      e.target === form.current ||
      (e.ctrlKey && e.key === "Enter" && text.length > 1)
    ) {
      e.preventDefault();
      addDocument({
        content: text,
        createdAt: new Date(), // change to server timestamp
        score: 0,
        user,
        commentId: replyTo.id,
      });

      showReplyForm(false);
      setText("");
    }
  };

  return (
    <form
      className="container"
      onSubmit={addReply}
      onKeyDown={addReply}
      ref={form}
    >
      {user && (
        <AnimatePresence>
          <motion.div
            className="form"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: [0.25, 0.75, 0.5, 1.25] }}
            key={"replyForm"}
          >
            <textarea
              name="Reply"
              className="form__input"
              onChange={(e) =>
                setText(e.target.value.slice(replyTo.user.username.length + 3))
              }
              value={`@${replyTo.user.username}, ${text}`}
              ref={input}
            />

            <img src={user.image} alt="user" className="form__image" />
            <button type="submit" className=" form__button btn">
              reply
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </form>
  );
};
