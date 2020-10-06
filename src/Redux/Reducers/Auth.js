import * as actionType from "../Actions/Auth";

const initialState = {
  idToken: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_LOGIN:
      return {
        ...state,
        idToken: action.idToken,
        userId: action.userId,
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        idToken: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
