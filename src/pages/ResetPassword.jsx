import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/Login.module.css";
import { Input } from "../components/Input";
import { BiLeftArrowAlt } from "react-icons/bi";

const initialState = {
  password: "",
  confirmpassword: ""
};

export const ResetPassword = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(initialState);
  const ref = useRef(null);
  const navigate = useNavigate();
  const param = useParams();

  console.log(param);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleReturn = () => {
    navigate("/", { replace: true });
  };

  const handleRegister = () => {
    setForm(initialState);
    ref.current.reset();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("La contraseña es", form);
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Restablecer Contraseña</h2>
        <form ref={ref} className={styles.formulario} onSubmit={handleSubmit}>
          <Input
            type={visible ? "text" : "password"}
            text="Contraseña"
            name="password"
            icon={visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            onClick={handleVisible}
            onChange={handleChange}
          />
          <Input
            type={visible ? "text" : "password"}
            text="Confirmar Contraseña"
            name="confirmpassword"
            onClick={handleVisible}
            onChange={handleChange}
          />

          <button type="submit" className={styles.btnSubmitForm}>
            Restablecer
          </button>

          <div className={styles.forgotPassword}>
            <button
              className={`${styles.btnForm} ${styles.buttonIsRegister} ${styles.backBtn}`}
              onClick={handleReturn}
            >
              <BiLeftArrowAlt size={25} />
              Ir al Inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
