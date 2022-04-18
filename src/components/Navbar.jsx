import "./Navbar.scss";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useCurrentUser } from "../hooks/useCurrentUser";
export const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const currentUser = useCurrentUser();

  return (
    <nav className="navbar">
      <h1 className="navbar__logo">
        <FontAwesomeIcon icon={faComment} />
        texto
      </h1>

      <ul className="navbar__list">
        <li className="navbar__item">
          {user && (
            <>
              <p className="navbar__username">{user.displayName}</p>
              <img
                src={currentUser.image}
                alt="user"
                className="navbar__user-image"
              />
              <button className="btn btn--logout" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};
