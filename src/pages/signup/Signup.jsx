import styles from "../register/Register.module.scss";
import illustration from "../../images/illustration.svg";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { motion } from "framer-motion";
import { Socials } from "../../components/Socials";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <motion.main
      className={styles.main}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4, ease: [0.25, 0.75, 0.5, 1.25] }}
    >
      <div className={styles.container}>
        <div className={styles.composition}>
          <img src={illustration} alt="illustration" />
        </div>

        <div className={styles.content}>
          <p className={styles.title}>Create an account</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button className={styles.btn}>Sign Up</button>
          </form>

          <Socials />
        </div>
      </div>
    </motion.main>
  );
};
