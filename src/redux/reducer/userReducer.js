import { actionType } from "../constants/actionTypes";

const initialState = {
  userDetails: [],
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.CREATE_USER:
      return { ...state, userDetails: [payload].concat(state.userDetails) };
    case actionType.EDIT_USER:
      let arr = state.userDetails.filter((user) => user.id == payload);
      arr = arr.values();
      for (let val of arr){
          arr =val;
      }
      return { ...state, user:arr };
    default:
      return state;
  }
};
