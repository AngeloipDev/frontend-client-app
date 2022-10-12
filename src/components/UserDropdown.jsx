import user from "../img/user.jpg";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineSetting, AiOutlineMail } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/UserDropdown.module.css";

export const UserDropdown = () => {
  const ref = useRef();
  const [activeDrop, setActiveDrop] = useState(false);

  const classMenu = activeDrop
    ? `${styles.menu} ${styles.active}`
    : styles.menu;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeDrop && !ref.current.contains(e.target)) {
        setActiveDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div ref={ref} className={styles.action}>
      <div
        className={styles.profile}
        onClick={() => setActiveDrop(!activeDrop)}
      >
        <img src={user} alt="" />
      </div>
      <div className={classMenu}>
        <h3>
          Someone Famous
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
          <li>
            <BiLogOut className={styles.icon} />
            <Link>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
