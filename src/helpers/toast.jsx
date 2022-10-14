import { toast } from "react-toastify";

export const Toast = (type, msg) => {
  const options = {
    autoClose: 3000,
    position: "bottom-center"
  };
  if (type === "success") {
    return toast.success(msg, options);
  }
  if (type === "error") {
    return toast.error(msg, options);
  }
};
