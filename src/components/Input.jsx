import styles from "../styles/Input.module.css";

export const Input = ({
  type,
  name,
  id,
  onChange,
  value,
  onClick,
  icon,
  text
}) => {
  return (
    <div className={styles.cont_input}>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        autoComplete="off"
        placeholder=" "
        className={styles.form__input}
      />
      <span className={styles.icon} onClick={onClick}>
        {icon}
      </span>
      <label className={styles.form__label} htmlFor={id}>
        {text}
      </label>
    </div>
  );
};
