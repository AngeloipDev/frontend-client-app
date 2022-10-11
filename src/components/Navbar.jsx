import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.subNavbarContainer}>
        <div className={styles.logo}>
          <Link to="/">Logo</Link>
        </div>

        <div className={styles.searchProductBox}>Buscador</div>

        <div className={styles.options}>
          <ul>
            <li>
              <Link to="/login" className={styles.loginBtn}>
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
