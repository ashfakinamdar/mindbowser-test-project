import { actionType } from "../constants/actionTypes";

export const getSchools = (schools) => {
  return {
    type: actionType.GET_SCHOOLS,
    payload: schools,
  };
};

export const createUser = (userDetails) => {
  return {
    type: actionType.CREATE_USER,
    payload: userDetails,
  };
};

export const editUser = (id) => {
  return {
    type: actionType.EDIT_USER,
    payload: id,
  };
};

export const updateUser = (userDetails) => {
  return {
    type: actionType.UPDATE_USER,
    payload: userDetails,
  };
};

export const deleteUser = (id) => {
  return {
    type: actionType.DELETE_USER,
    payload: id,
  };
};
