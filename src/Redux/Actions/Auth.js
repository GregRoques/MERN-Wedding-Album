import axios from "axios";
import { api, compId } from "../../AxiosOrders";

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
  if (lsToken) {
    axios
      .post(`${api}/isloggedin`, {
        token: lsToken,
        id: compId,
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
