import * as actionType from "../Actions/Auth";

const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
