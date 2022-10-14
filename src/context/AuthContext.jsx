import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Toast } from "../helpers/toast";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  token: ""
};

export const AuthContext = createContext(INITIAL_STATE);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const _appSigning = localStorage.getItem("_appSigning");
    if (_appSigning) {
      const getToken = async () => {
        await axios
          .post("http://localhost:5000/api/user/access", null, {
            withCredentials: true
          })
          .then((res) => {
            dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
          })
          .catch((err) => {
            Toast("error", err.response.data.msg);
          });
      };
      getToken();
    }
  }, [dispatch, state.isLoggedIn]);

  useEffect(() => {
    if (state.token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        await axios
          .get("http://localhost:5000/api/user/auth/user", {
            headers: {
              Authorization: state.token
            }
          })
          .then((res) => {
            dispatch({ type: "GET_USER", payload: res.data.user });
          })
          .catch((err) => Toast("error", err.response.data));
      };
      getUser();
    }
  }, [dispatch, state.token]);

  const value = {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    token: state.token,
    dispatch
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
