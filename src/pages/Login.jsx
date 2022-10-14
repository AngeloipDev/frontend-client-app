import { Input } from "../components/Input";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isEmpty, isEmail, isLength, isMatch } from "../helpers/validate";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toast } from "../helpers/toast";
import { useAuth } from "../context/AuthContext";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import styles from "../styles/Login.module.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: ""
};

export const Login = () => {
  const [visible, setVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const { name, email, password, confirmpassword } = form;
  const ref = useRef(null);
  const { dispatch } = useAuth();
  console.log(process.env.REACT_APP_G_CLIENT_ID);

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

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      return Toast("error", "Complete todos los campos");
    }

    if (!isEmail(email)) {
      return Toast("error", "Ingrese un correo válido");
    }

    const user = {
      email,
      password
    };

    setIsLoading(true);
    await axios
      .post("http://localhost:5000/api/user/auth/login", user, {
        withCredentials: true
      })
      .then((res) => {
        localStorage.setItem("_appSigning", true);
        dispatch({ type: "SIGNING" });
        Toast("success", res.data.msg);
      })
      .catch((err) => Toast("error", err.response.data.msg));

    setIsLoading(false);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password)) {
      return Toast("error", "Complete todos los campos");
    }

    if (!isEmail(email)) {
      return Toast("error", "Ingrese un correo válido");
    }

    if (isLength(password)) {
      return Toast("error", "La contraseña debe tener al menos 6 caracteres");
    }

    if (!isMatch(password, confirmpassword)) {
      return Toast("error", "Las contraseñas no coinciden");
    }

    const user = {
      name,
      email,
      password
    };

    setIsLoading(true);
    await axios
      .post("http://localhost:5000/api/user/auth/register", user)
      .then((res) => {
        Toast("success", res.data.msg);
        setForm(initialState);
        ref.current.reset();
      })
      .catch((err) => Toast("error", err.response.data.msg));

    setIsLoading(false);
  };

  const googleSuccess = async (res) => {
    const token = res?.tokenId;
    console.log(token);
    try {
      await axios
        .post(
          "http://localhost:5000/api/user/auth/google_login",
          { tokenId: token },
          {
            withCredentials: true
          }
        )
        .then((res) => {
          localStorage.setItem("_appSigning", true);
          dispatch({ type: "SIGNING" });
          Toast("success", res.data.msg);
        })
        .catch((err) => Toast("error", err.response.data.msg));
    } catch (err) {
      Toast("error", err.response.data.msg);
    }
  };

  const googleError = (res) => {
    Toast("error", res.error);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_G_CLIENT_ID,
        scope: ""
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            {isRegister ? "Registro" : "Iniciar Sesión"}
          </h2>
          <form
            ref={ref}
            className={styles.formulario}
            onSubmit={isRegister ? handleSubmitRegister : handleSubmitLogin}
          >
            {isRegister && (
              <Input
                type="text"
                text="Nombre"
                name="name"
                onChange={handleChange}
              />
            )}
            <Input
              type="text"
              text="Correo electrónico"
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
            {isRegister && (
              <Input
                type={visible ? "text" : "password"}
                text="Confirmar Contraseña"
                name="confirmpassword"
                onClick={handleVisible}
                onChange={handleChange}
              />
            )}

            <button type="submit" className={styles.btnSubmitForm}>
              {isRegister && isLoading
                ? "Cargando Registro..."
                : !isRegister && isLoading
                ? "Ingresando..."
                : isRegister
                ? "Registrarse"
                : "Iniciar Sesión"}
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
            <GoogleLogin
              clientId={process.env.REACT_APP_G_CLIENT_ID}
              render={(renderProps) => (
                <button
                  type="button"
                  className={`${styles.btnForm} ${styles.buttonGoogle}`}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle size={20} className={styles.iconGoogle} />

                  {isRegister ? "Registrarse con Google" : "Acceder con Google"}
                </button>
              )}
              cookiePolicy={"single_host_origin"}
              onSuccess={googleSuccess}
              onFailure={googleError}
            />

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
    </>
  );
};
