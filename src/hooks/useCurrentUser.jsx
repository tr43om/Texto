import { useAuthContext } from "./useAuthContext";

export const useCurrentUser = () => {
  const { user: loggedInUser } = useAuthContext();

  const user = {
    username: loggedInUser.displayName,
    uid: loggedInUser.uid,
    image: !loggedInUser.photoURL
      ? `https://ui-avatars.com/api/?name=${loggedInUser.displayName}&background=random&rounded=true`
      : loggedInUser.photoURL,
  };

  return user;
};
