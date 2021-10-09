import { actionType } from "../constants/actionTypes";

const initialState = {
  schools: [],
};

export const schoolReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.GET_SCHOOLS:
      return { ...state, schools: payload };
    default:
      return state;
  }
};
