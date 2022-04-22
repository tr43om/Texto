// hooks
import { useEffect, useState } from "react";
import { useTimePassed } from "../../hooks/useTimePassed";
import { useFirestore } from "../../hooks/useFirestore";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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

import { Rating } from "../../components/Rating";

export const Reply = ({ id, comment }) => {
  const [update, setUpdate] = useState(false);
  const [text, setText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [reply, setReply] = useState();
  const currentUser = useCurrentUser();

  const { deleteDocument, updateDocument } = useFirestore("replies");
  const createdAt = useTimePassed(reply);

  // Get reply from firestore
  useEffect(() => {
    const ref = doc(db, "replies", id);
    const unsub = onSnapshot(ref, (doc) => {
      setReply({ ...doc.data(), id: id });
    });

    return () => unsub();
  }, [id]);

  const updateReply = () => {
    updateDocument(id, { content: text });

    setUpdate(false);
  };

  // Delete comment or reply
  const deleteReply = () => {
    deleteDocument(id);
  };

  return (
    <div className="comment-container">
      {reply && (
        <>
          <div className="comment">
            <Rating
              uid={currentUser?.uid}
              comment={reply}
              isOwnComment={currentUser?.uid === reply.user?.uid}
              type={"replies"}
            />
            <div className="comment__content">
              <img
                src={reply.user?.image}
                alt="User"
                className="comment__avatar"
              />
              <span className="comment__username">{reply.user?.username}</span>

              <span className="comment__posted">{createdAt}</span>
              <div className="comment__controls">
                {currentUser?.uid !== reply.user?.uid && (
                  <button
                    className=" btn btn--reply"
                    onClick={() => setShowReplyForm((prevValue) => !prevValue)}
                  >
                    <FontAwesomeIcon icon={faReply} />
                  </button>
                )}

                {currentUser?.uid === reply.user?.uid && (
                  <>
                    <button
                      className="btn btn--delete"
                      onClick={() => deleteReply(reply.id)}
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
                {!update && (
                  <div>
                    <span className="comment__accent">
                      {reply.content?.split(",")[0]},&nbsp;
                    </span>
                    {reply.content?.split(",")[1]}
                  </div>
                )}
                {update && (
                  <>
                    <input
                      type="text"
                      onChange={(e) => setText(e.target.value)}
                      defaultValue={reply.content}
                      className="comment__input"
                    />
                    <button
                      type="submit"
                      onClick={updateReply}
                      className="comment__update"
                    >
                      update
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {showReplyForm && (
            <ReplyForm
              replyTo={comment}
              replyToUsername={reply.user.username}
              showReplyForm={setShowReplyForm}
              parentComment={comment}
            />
          )}
        </>
      )}
    </div>
  );
};
