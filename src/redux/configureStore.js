import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { StaffList } from "./staffList";
import { Department } from "./department";

import { Payroll } from "./payroll";
import { ToggleForm } from "./form";

export function ConfigureStore() {
  const store = createStore(
    combineReducers({
      staffs: StaffList,
      departments: Department,
      salary: Payroll,
      formStatus: ToggleForm,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
