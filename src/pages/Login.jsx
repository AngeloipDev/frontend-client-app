import { Input } from "../components/Input";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: ""
};

export const Login = () => {
  const [visible, setVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState(initialState);
  const ref = useRef(null);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleRegister = () => {
    setIsRegister(!isRegister);
    setForm(initialState);
    ref.current.reset();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Los datos son", form);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {isRegister ? "Registro" : "Iniciar Sesión"}
        </h2>
        <form ref={ref} className={styles.formulario} onSubmit={handleSubmit}>
          {isRegister && (
            <Input
              type="text"
              text="Nombre"
              name="name"
              onChange={handleChange}
            />
          )}
          <Input
            type="email"
            text="Email"
            name="email"
            onChange={handleChange}
          />
          <Input
            type={visible ? "text" : "password"}
            text="Contraseña"
            name="password"
            icon={visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            onClick={handleVisible}
            onChange={handleChange}
          />

          <button type="submit" className={styles.btnSubmitForm}>
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
          <div className={styles.forgotPassword}>
            <Link
              to="/forgot-password"
              className={`${styles.btnForm} ${styles.buttonForgotPass}`}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <p className={styles.orP}>
            <span className={styles.orSpan}>O</span>
          </p>
          <button
            type="button"
            className={`${styles.btnForm} ${styles.buttonGoogle}`}
          >
            <FcGoogle size={20} className={styles.iconGoogle} />

            {isRegister ? "Registrarse con Google" : "Acceder con Google"}
          </button>
          <br />
          <div className={styles.link_register}>
            <span>
              {isRegister
                ? "¿Ya tienes una cuenta?"
                : "¿Aún no tienes una cuenta?"}
            </span>
            <button
              type="button"
              className={`${styles.btnForm} ${styles.buttonIsRegister}`}
              onClick={handleRegister}
            >
              {isRegister ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
