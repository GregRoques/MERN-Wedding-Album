import axios from "axios";
import { browserName } from "react-device-detect";
import { api } from "../../Dependencies/AxiosOrders";

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

export const authCheckState = (ipAddress) => {
  return (dispatch) => {
    const token = window.localStorage.getItem("GR-Wedding-Token");
    console.log(token);
    if (token) {
      axios
        .post(`${api}/isloggedin`, {
          token: token,
          userId: {
            browserName,
            ipAddress,
          },
        })
        .then((res) => {
          if (res.data === "YES") {
            dispatch(logIn());
          } else {
            dispatch(logOut());
          }
        })
        .catch((err) => {
          if (err) {
            dispatch(logOut());
          }
        });
    } else {
      dispatch(logOut());
    }
  };
};
