import axios from "axios";
import { api } from "../../Dependencies/AxiosOrders";
import { compId } from "../../Dependencies/userInfo";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const logIn = () => {
  return {
    type: AUTH_LOGIN,
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_LOGOUT,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      axios
        .post(`${api}/isloggedin`, {
          token: lsToken,
          userId: compId,
        })
        .then((res) => {
          if (res.data === "YES") {
            dispatch(logIn());
          } else {
            dispatch(logOut());
          }
        })
        .catch(() => {
          dispatch(logOut());
        });
    } else {
      dispatch(logOut());
    }
  };
};
