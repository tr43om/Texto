import { arrayRemove, arrayUnion, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCurrentUser } from "./useCurrentUser";
import { useFirestore } from "./useFirestore";
import { useState } from "react";

export const useVote = (comment) => {
  const [isUpvoted, setIsUpvoted] = useState(null);
  const [isDownvoted, setIsDownvoted] = useState(null);
  const { updateDocument: updateUser } = useFirestore("users");
  const { updateDocument } = useFirestore(
    comment?.hasOwnProperty("commentId") ? "replies" : "comments"
  );

  const currentUser = useCurrentUser();

  const voteUp = async () => {
    if (!comment.id) return;
    setIsUpvoted((vote) => !vote);

    if (isUpvoted) {
      updateDocument(comment.id, { score: comment.score++ });
    }

    if (!isUpvoted) {
      updateDocument(comment.id, { score: comment.score-- });
    }

    updateDocument(comment.id, { score: comment.score++ });

    // const user = await getDoc(doc(db, "users", currentUser.uid));
    // if (user.data()?.upvotedComments?.includes(comment.id)) return;
    // if (user.data()?.downvotedComments?.includes(comment.id)) {
    //   updateDocument(comment.id, { score: comment.score + 2 });
    // } else {
    //   updateDocument(comment.id, { score: comment.score++ });
    // }

    // updateUser(currentUser.uid, { upvotedComments: arrayUnion(comment.id) });
    // updateUser(currentUser.uid, { downvotedComments: arrayRemove(comment.id) });
  };

  const voteDown = async () => {
    const user = await getDoc(doc(db, "users", currentUser.uid));
    if (user.data()?.downvotedComments?.includes(comment.id)) return;
    if (user.data()?.upvotedComments?.includes(comment.id)) {
      updateDocument(comment.id, { score: comment.score - 2 });
    } else {
      updateDocument(comment.id, { score: comment.score-- });
    }

    updateUser(currentUser.uid, { downvotedComments: arrayUnion(comment.id) });
    updateUser(currentUser.uid, { upvotedComments: arrayRemove(comment.id) });
  };

  return { voteDown, voteUp };
};
