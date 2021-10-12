import { actionType } from "../constants/actionTypes";

// Get schools
export const getSchools = (schools) => {
  return {
    type: actionType.GET_SCHOOLS,
    payload: schools,
  };
};

// Create a new user
export const createUser = (userDetails) => {
  return {
    type: actionType.CREATE_USER,
    payload: userDetails,
  };
};

// edit a user
export const editUser = (id) => {
  return {
    type: actionType.EDIT_USER,
    payload: id,
  };
};

// update a user
export const updateUser = (userDetails) => {
  return {
    type: actionType.UPDATE_USER,
    payload: userDetails,
  };
};

// delete a user
export const deleteUser = (id) => {
  return {
    type: actionType.DELETE_USER,
    payload: id,
  };
};
