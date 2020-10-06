export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const authSuccess = (idToken, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
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
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  };
};
