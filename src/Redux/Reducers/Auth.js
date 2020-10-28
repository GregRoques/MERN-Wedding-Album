import * as actionType from "../Actions/Auth";

const initialState = {
  isLoggedIn: "",
  isLoaded: "no",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
        isLoaded: "no",
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: "",
        isLoaded: "yes",
      };
    default:
      return state;
  }
};

export default authReducer;
