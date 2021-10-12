import { actionType } from "../constants/actionTypes";

const initialState = {
  userDetails: [
    {
      address: "Goa",
      birthDate: "05/10/2021",
      college: "American University of Middle East",
      email: "example@gmail.com",
      gender: "Male",
      hobbies: ["Reading", "Gaming"],
      id: "TGhsy9QI7evYpuSp0jkBZ",
      name: "Ashfak Inamdar",
      phone: "7987666546",
    },
    {
      address: "USA",
      birthDate: "05/10/2021",
      college: "American University of Middle East",
      email: "kapoorharshad2012@gmail.com",
      gender: "Male",
      hobbies: ["Reading", "Gaming"],
      id: "TGhsy9QI7evYpuSp0jkBZx",
      name: "James Bond",
      phone: "8795248965",
    },
  ],
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.CREATE_USER:
      return { ...state, userDetails: [payload].concat(state.userDetails) };
    case actionType.EDIT_USER:
      let arr = state.userDetails.filter((user) => user.id === payload);
      arr = arr.values();
      for (let val of arr) {
        arr = val;
      }
      return { ...state, user: arr };
    case actionType.UPDATE_USER:
      return {
        ...state,
        userDetails: state.userDetails.map((user) =>
          user.id == payload.id ? payload : user
        ),
      };
    case actionType.DELETE_USER:
      return {
        ...state,
        userDetails: state.userDetails.filter((user) => user.id != payload),
      };
    default:
      return state;
  }
};
