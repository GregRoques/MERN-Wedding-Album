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

export const logOut = (info) => {
  console.log(info)
  window.localStorage.removeItem("GR-Wedding-Token");
  axios.post(`${api}/logout`, {
    info
  });
  return {
    type: AUTH_LOGOUT
  };
  
};

export const authCheckState = (ip) => {
  return (dispatch) => {
    const password = window.localStorage.getItem("GR-Wedding-Token");
    if (password && ip) {
      axios
        .post(`${api}/isloggedin`, {
          password,
          browser: browserName,
          ip
        })
        .then((res) => {
          const { updateToken } = res.data;
          if (updateToken.length > 10) {
            window.localStorage.setItem("GR-Wedding-Token", updateToken);
            dispatch(logIn({
              password: updateToken,
              browser: browserName,
              ip
            }));
          }
        }).catch(()=>{
          dispatch(logOut({
            password: "",
            browser: browserName,
            ip
          }))
        })
    } else {
      dispatch(logOut({
        password: "",
        browser: browserName,
        ip
      }))
    }
  };
};
