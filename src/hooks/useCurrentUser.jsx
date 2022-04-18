import { useAuthContext } from "./useAuthContext";

export const useCurrentUser = () => {
  const { user: data } = useAuthContext();

  const user = {
    username: data.displayName,
    uid: data.uid,
    image: !data.photoURL
      ? `https://ui-avatars.com/api/?name=${data.displayName}&background=random&rounded=true`
      : data.photoURL,
  };

  return user;
};
