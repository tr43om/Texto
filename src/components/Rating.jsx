// Firebase
import { db } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import { arrayRemove, arrayUnion, doc, onSnapshot } from "firebase/firestore";

// react hooks
import { useEffect, useState } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// components
import { Error } from "./Error";

export const Rating = ({ isOwnComment, comment, uid, type }) => {
  const [user, setUser] = useState(null);
  const [showError, setShowError] = useState(null);
  const [isUpvoted, setIsUpvoted] = useState(null);
  const [isDownvoted, setIsDownvoted] = useState(null);

  const { updateDocument } = useFirestore(type);

  const { updateDocument: updateUser } = useFirestore("users");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
      setUser(doc.data());

      setIsDownvoted(doc.data().downvotedComments?.includes(comment.id));
      setIsUpvoted(doc.data().upvotedComments?.includes(comment.id));
    });

    setTimeout(() => setShowError(false), 3000);

    return () => unsub();
  }, [uid, showError, comment.id]);

  const voteUp = () => {
    if (isOwnComment) {
      setShowError(true);
      return;
    }

    if (isUpvoted) {
      comment.score--;
      updateUser(uid, {
        upvotedComments: arrayRemove(comment.id),
      });
    }

    if (!isUpvoted) {
      comment.score++;
      updateUser(uid, {
        upvotedComments: arrayUnion(comment.id),
      });
    }

    if (!isUpvoted && isDownvoted) {
      updateUser(uid, {
        downvotedComments: arrayRemove(comment.id),
      });
      updateUser(uid, {
        upvotedComments: arrayUnion(comment.id),
      });
      setIsDownvoted(false);
      comment.score++;
    }

    updateDocument(comment.id, { score: comment.score });
  };

  const voteDown = () => {
    if (isOwnComment) {
      setShowError(true);
      return;
    }

    if (isDownvoted) {
      comment.score++;
      updateUser(uid, {
        downvotedComments: arrayRemove(comment.id),
      });
    }

    if (!isDownvoted) {
      comment.score--;
      updateUser(uid, {
        downvotedComments: arrayUnion(comment.id),
      });
    }

    if (isUpvoted && !isDownvoted) {
      updateUser(uid, {
        upvotedComments: arrayRemove(comment.id),
      });
      updateUser(uid, {
        downvotedComments: arrayUnion(comment.id),
      });

      setIsUpvoted(false);
      comment.score--;
    }

    updateDocument(comment.id, { score: comment.score });
  };

  return (
    <>
      {showError && isOwnComment && (
        <Error
          message={`Oops, you can't vote your own ${
            type === "comments" ? "comment" : "reply"
          } 😦`}
        />
      )}
      {user && (
        <div className="comment__vote">
          <button
            className="comment__vote-up"
            onClick={voteUp}
            style={{
              color: user.upvotedComments?.includes(comment.id)
                ? "var(--c-accent)"
                : "var(--c-accent-light)",
            }}
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </button>
          <span>{comment.score}</span>
          <button
            className="comment__vote-down"
            onClick={voteDown}
            disabled={false}
            style={{
              color: user.downvotedComments?.includes(comment.id)
                ? "var(--c-accent)"
                : "var(--c-accent-light)",
            }}
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
      )}
    </>
  );
};
