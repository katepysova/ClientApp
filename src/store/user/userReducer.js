import userTypes from "@store/user/userTypes.js";

const initialState = {
  pcId: ""
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userTypes.setUserPcId: {
      return {
        ...state,
        pcId: action.payload
      };
    }
    default:
      return state;
  }
}
