import { useLogin } from "../../hooks/useLogin";
import styles from "../register/Register.module.scss";
import { useState } from "react";
import illustration from "../../images/illustration.svg";

// framer motion
import { motion } from "framer-motion";
import { Socials } from "../../components/Socials";

export const Login = () => {
  const { login } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
    setEmail("");
    setPassword("");
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
          <p className={styles.title}>Sign In</p>
          <p className={styles.subtitle}>
            Use your email address or sign in with your social profile
          </p>

          <form onSubmit={handleSubmit}>
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

            <button className={styles.btn}>Sign In</button>
          </form>

          <Socials />
        </div>
      </div>
    </motion.main>
  );
};
