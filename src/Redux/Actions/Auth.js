import axios from "axios";
import { browserName } from "react-device-detect";
import { api } from "../../Dependencies/AxiosOrders";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const logIn = (token) => {
  return {
    type: AUTH_LOGIN,
    payload: token,
  };
};

export const logOut = (token) => {
  window.localStorage.removeItem("GR-Wedding-Token");
  axios.post(`${api}/logOut`, {
    token
  });
  return {
    type: AUTH_LOGOUT,
  };
};

export const authCheckState = (ipAddress) => {
  return (dispatch) => {
    const token = window.localStorage.getItem("GR-Wedding-Token");
    if (token && ipAddress) {
      axios
        .post(`${api}/isloggedin`, {
          token,
          userId: {
            browserName,
            ipAddress,
          },
        })
        .then((res) => {
          const { updateToken } = res.data;
          if (updateToken.length > 10) {
            window.localStorage.setItem("GR-Wedding-Token", updateToken);
            dispatch(logIn({
              password: updateToken,
              browswer: browserName,
              ip: ipAddress
            }));
          }
        })
    }
  };
};
