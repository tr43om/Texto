// styles
import "./CommentForm.scss";

// hooks
import { useRef, useState } from "react";

import { useFirestore } from "../../hooks/useFirestore";

import { useCurrentUser } from "../../hooks/useCurrentUser";

export const CommentForm = () => {
  const [text, setText] = useState("");
  const input = useRef();

  const { addDocument } = useFirestore("comments");

  const user = useCurrentUser();
  const form = useRef();

  // Add new comment
  const handleSubmit = (e) => {
    if (
      e.target === form.current ||
      (e.ctrlKey && e.key === "Enter" && text.length > 1)
    ) {
      e.preventDefault();
      addDocument({
        content: text,
        score: 0,
        user,
      });
      setText("");
    }
  };

  return (
    <form
      className="container form"
      onKeyDown={handleSubmit}
      onSubmit={handleSubmit}
      ref={form}
    >
      {user && (
        <>
          <textarea
            name="Comment"
            placeholder="Add a comment..."
            className="form__input"
            onChange={(e) => setText(e.target.value)}
            value={text}
            ref={input}
          />

          <img
            src={user.image}
            alt="user"
            className="form__image"
            style={{ borderRadius: "50%" }}
          />
          <button type="submit" className="btn form__button">
            send
          </button>
        </>
      )}
    </form>
  );
};
