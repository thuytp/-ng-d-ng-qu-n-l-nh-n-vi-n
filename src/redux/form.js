import * as ActionTypes from "./ActionTypes";

export const ToggleForm = (state = { formStatus: false }, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_FORM:
      return { formStatus: !state.formStatus };
    default:
      return state;
  }
};
