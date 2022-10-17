import * as ActionTypes from "./ActionTypes";

export const StaffList = (
  state = { isLoading: true, errMess: null, staffs: [], search: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    case ActionTypes.STAFFS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        staffs: [],
      };

    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };

    case ActionTypes.ADD_STAFF:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    case ActionTypes.SEARCH:
      return { ...state, search: action.payload };

    case ActionTypes.DELETE_STAFF:
      return { ...state, staffs: action.payload };


    default:
      return state;
  }
};
