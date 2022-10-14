import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import styles from "../styles/Login.module.css";
import { Input } from "../components/Input";
import { BiLeftArrowAlt } from "react-icons/bi";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  const handleRegister = () => {
    setEmail("");
    ref.current.reset();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("El correo es", email);
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Recuperar Contraseña</h2>
        <form ref={ref} className={styles.formulario} onSubmit={handleSubmit}>
          <Input
            type="text"
            text="Correo electrónico"
            name="email"
            onChange={handleChange}
          />

          <button type="submit" className={styles.btnSubmitForm}>
            Enviar
          </button>

          <div className={styles.forgotPassword}>
            <Link
              to="/login"
              className={`${styles.btnForm} ${styles.buttonForgotPass} ${styles.backBtn}`}
              onClick={handleRegister}
            >
              <BiLeftArrowAlt size={25} />
              Iniciar Sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
