import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

import "./Socials.scss";

export const Socials = () => {
  const { loginWithGoogle } = useGoogleLogin("google");

  return (
    <div className="socials">
      <p>or</p>
      <button className="social social--google" onClick={loginWithGoogle}>
        <FontAwesomeIcon icon={faGoogle} />
        <span>Continue with google</span>
      </button>
    </div>
  );
};
