import * as ActionTypes from "./ActionTypes";

export const Payroll = (
  state = { isLoading: true, errMess: null, payroll: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.SALARY_LOADING:
      return { ...state, isLoading: true, errMess: null, payroll: [] };

    case ActionTypes.SALARY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        payroll: [],
      };

    case ActionTypes.ADD_SALARY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        payroll: action.payload,
      };

    default:
      return state;
  }
};
