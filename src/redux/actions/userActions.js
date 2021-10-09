import { actionType } from "../constants/actionTypes";
export const getSchools = (schools) => {
  return {
    type: actionType.GET_SCHOOLS,
    payload: schools,
  };
};
