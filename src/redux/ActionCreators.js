import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { push } from "react-router-redux";

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            "Error" + response.status + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => {
      dispatch(addStaffs(staffs));
    })
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            "Error" + response.status + response.statusText
          );
          response = error.response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departments) => {
      dispatch(addDepartments(departments));
    })
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});

export const addSalary = (payroll) => ({
  type: ActionTypes.ADD_SALARY,
  payload: payroll,
});

export const fetchPayroll = () => (dispatch) => {
  dispatch(salaryLoading(true));
  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            "Error" + response.status + response.statusText
          );
          response = error.response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((payroll) => dispatch(addSalary(payroll)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff =
  (
    staffName,
    staffDob,
    staffSalaryScale,
    staffStartDate,
    staffDepartment,
    staffAnnualLeave,
    overTime,
    salary
  ) =>
  (dispatch) => {
    const newStaff = {
      name: staffName,
      doB: staffDob,
      salaryScale: staffSalaryScale,
      startDate: staffStartDate,
      departmentId: staffDepartment,
      annualLeave: staffAnnualLeave,
      image: "/assets/images/alberto.png",
      overTime: overTime,
      salary: salary,
    };
    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) return response;
          else {
            let error = new Error(
              "Error" + response.status + response.statusText
            );
            response = error.response;
            throw error;
          }
        },
        (error) => {
          let errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((staff) => {
        dispatch(addStaff(staff));
      })
      .catch((error) => alert("Cannot post new staff" + error.message));
  };

export const toggleForm = () => ({
  type: ActionTypes.TOGGLE_FORM,
});

export const searchStaff = (filterredList) => ({
  type: ActionTypes.SEARCH,
  payload: filterredList,
});

export const deleteStaff = (staff) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: staff,
});

export const deleteRequest = (id) => (dispatch) => {
  return fetch(baseUrl + "staffs" + id, { method: "DELETE" })
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            "Error" + response.status + response.statusText
          );
          response = error.response;
          throw error;
        }
      },
      (error) => {
        let errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((staff) => {
      dispatch(deleteStaff(staff));
    })
    .catch((error) => alert("Cannot delete staff" + error.message));
};
