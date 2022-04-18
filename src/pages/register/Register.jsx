// styles
import styles from "./Register.module.scss";

import illustration from "../../images/illustration.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Socials } from "../../components/Socials";

export const Register = () => {
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
          <p className={styles.title}>Welcome 👋</p>
          <p className={styles.subtitle}>To React Comment Section Project</p>

          <Link to="/login" className={styles.btn}>
            <button>Sign In</button>
          </Link>
          <Link to="/signup" className={styles.btn}>
            <button>Sign Up</button>
          </Link>

          <Socials />
        </div>
      </div>
    </motion.main>
  );
};
