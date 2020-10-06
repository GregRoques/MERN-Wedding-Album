export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const logIn = (idToken, userId) => {
  return {
    type: AUTH_LOGIN,
    idToken,
    userId,
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
  return (dispatch) => {
    if (!lsToken) {
      dispatch(logOut());
    } else {
      dispatch(authLoggedIn(lsToken, lsUserId));
    }
  };
};
