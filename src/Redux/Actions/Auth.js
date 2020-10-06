import axios from "axios";
import { api } from "../../AxiosOrders";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const logIn = (props) => {
  return {
    type: AUTH_LOGIN,
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT,
  };
};

export const authCheckState = () => {
  const lsToken = localStorage.getItem("token");
  const lsUserId = localStorage.getItem("userId");
  if (lsToken && lsUserId) {
    axios
      .post(`${api}/isloggedin`, {
        token: lsToken,
        id: lsUserId,
      })
      .then((res) => {
        if (res.data === "yes") {
          return (dispatch) => {
            dispatch(logIn());
          };
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
