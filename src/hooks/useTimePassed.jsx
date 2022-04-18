import { useState, useEffect } from "react";

// How many time have passed since posted
export const useTimePassed = (comment) => {
  const [created, setCreated] = useState();
  const current = new Date();

  useEffect(() => {
    if (comment && comment.createdAt)
      setCreated(new Date(comment.createdAt.seconds * 1000));
  }, [comment]);

  // seconds have passed since comment was published
  const difference = Math.ceil(Math.abs(created - current) / 1000);

  // prettier-ignore
  const second = 1,
        minute = second * 60,
        hour   = minute * 60,
        day    = hour * 24,
        week   = day  * 7,
        month  = day  * 30;

  // prettier-ignore
  const minutesPassed = Math.floor(difference / minute),
        hoursPassed   = Math.floor(difference / hour),
        daysPassed    = Math.floor(difference / day),
        weeksPassed   = Math.floor(difference / week),
        monthsPassed  = Math.floor(difference / month);

  // prettier-ignore
  return (
    (difference >= month &&
      `${monthsPassed} month${monthsPassed > 1 ? "s" : ""} ago`) ||
    (difference >= week  &&
      `${weeksPassed} ${weeksPassed > 1 ? "weeks" : "week"} ago`) ||
    (difference >= day   && 
        `${daysPassed} ${daysPassed > 1 ? "days" : "day"} ago`) ||
    (difference >= hour  &&
      `${hoursPassed} ${hoursPassed > 1 ? "hours" : "hour"} ago`) ||
    (difference >= minute   &&
      `${minutesPassed} ${minutesPassed > 1 ? "minutes" : "minute"} ago`) ||
    'just now'
  );
};
