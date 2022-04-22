// hooks
import { useEffect, useRef, useState } from "react";
import { useTimePassed } from "../../hooks/useTimePassed";
import { useFirestore } from "../../hooks/useFirestore";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useVote } from "../../hooks/useVote";

// firestore
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

// styles
import "./Comment.scss";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

// components
import { ReplyForm } from "./ReplyForm";
import { RepliesList } from "./RepliesList";
import { AnimatePresence, motion } from "framer-motion";
import { Rating } from "../../components/Rating";

export const Comment = ({ id }) => {
  // state
  const [comment, setComment] = useState();
  const [update, setUpdate] = useState(false);
  const [text, setText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const form = useRef();

  // hooks
  const { deleteDocument, updateDocument } = useFirestore("comments");
  const createdAt = useTimePassed(comment);
  const currentUser = useCurrentUser();
  // const { voteUp, voteDown } = useVote(comment);

  // Get comment from firestore
  useEffect(() => {
    const ref = doc(db, "comments", id);
    const unsub = onSnapshot(ref, (doc) => {
      setComment({ ...doc.data(), id: id });
    });

    return () => unsub();
  }, [id]);

  // Update comment
  const updateComment = (e) => {
    if (e.target === form.current || (e.ctrlKey && e.key === "Enter")) {
      e.preventDefault();

      updateDocument(id, { content: text });

      setUpdate(false);
    }
  };

  // Delete comment
  const deleteComment = () => {
    deleteDocument(comment.id);
  };

  return (
    <>
      {comment && (
        <div className="comment-container">
          <div className="comment">
            <Rating
              comment={comment}
              isOwnComment={currentUser?.uid === comment.user?.uid}
              uid={currentUser?.uid}
              type="comments"
            />
            <div className="comment__content">
              <img
                src={comment.user?.image}
                alt="User"
                className="comment__avatar"
              />
              <span className="comment__username">
                {comment.user?.username}
              </span>

              <span className="comment__posted">{createdAt}</span>
              <div className="comment__controls">
                {currentUser?.uid !== comment.user?.uid && (
                  <button
                    className=" btn btn--reply"
                    onClick={() => setShowReplyForm((prevValue) => !prevValue)}
                  >
                    <FontAwesomeIcon icon={faReply} />
                  </button>
                )}

                {currentUser?.uid === comment.user?.uid && (
                  <>
                    <button
                      className="btn btn--delete"
                      onClick={() => deleteComment(comment.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete</span>
                    </button>
                    <button
                      className="btn btn--edit"
                      onClick={() => setUpdate((prevValue) => !prevValue)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                      <span>Edit</span>
                    </button>
                  </>
                )}
              </div>
              <div className="comment__text">
                {!update && comment.content}

                {update && (
                  <AnimatePresence>
                    <motion.form
                      onSubmit={updateComment}
                      ref={form}
                      onKeyDown={updateComment}
                      key={`edit${comment.id}`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.75, 0.5, 1.25],
                      }}
                    >
                      {" "}
                      <input
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.content}
                        className="comment__input"
                      />
                      <button type="submit" className="comment__update">
                        update
                      </button>
                    </motion.form>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
          {showReplyForm && (
            <ReplyForm
              replyTo={comment}
              parentComment={comment}
              showReplyForm={setShowReplyForm}
              replyToUsername={comment.user.username}
            />
          )}
          <div className="comment__replies">
            <RepliesList parentComment={comment} />
          </div>
        </div>
      )}
    </>
  );
};
