import { HiOutlineUserCircle } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineSetting, AiOutlineMail } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/UserDropdown.module.css";
import axios from "axios";
import { Toast } from "../helpers/toast";
import { useAuth } from "../context/AuthContext";

export const UserDropdown = () => {
  const ref = useRef();
  const [activeDrop, setActiveDrop] = useState(false);
  const { dispatch, user } = useAuth();

  const classMenu = activeDrop
    ? `${styles.menu} ${styles.active}`
    : styles.menu;

  const logOut = async () => {
    await axios
      .get("http://localhost:5000/api/user/auth/signout", {
        withCredentials: true
      })
      .then((res) => {
        localStorage.removeItem("_appSigning");
        dispatch({ type: "SIGNOUT" });
        Toast("success", res.data.msg);
      })
      .catch((err) => Toast("error", err.response.data.msg));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeDrop && !ref.current.contains(e.target)) {
        setActiveDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDrop]);

  return (
    <div ref={ref} className={styles.action}>
      <div
        className={styles.profile}
        onClick={() => setActiveDrop(!activeDrop)}
      >
        <img src={user.avatar?.url} alt="" />
      </div>
      <div className={classMenu}>
        <h3>
          {user.name}
          <br />
          <span>Website Designer</span>
        </h3>
        <ul>
          <li>
            <HiOutlineUserCircle className={styles.icon} />
            <Link>My Profile</Link>
          </li>
          <li>
            <FaRegEdit className={styles.icon} />
            <Link>Edit Profile</Link>
          </li>
          <li>
            <AiOutlineMail className={styles.icon} />
            <Link>Inbox</Link>
          </li>
          <li>
            <AiOutlineSetting className={styles.icon} />
            <Link>Settings</Link>
          </li>
          <li>
            <FiHelpCircle className={styles.icon} />
            <Link>Help</Link>
          </li>
          <li onClick={logOut}>
            <BiLogOut className={styles.icon} />
            <Link>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
