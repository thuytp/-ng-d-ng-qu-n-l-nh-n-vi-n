import React from "react";
import "./App.css";
import { useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import StaffList from "./Components/StaffList";
import StaffId from "./Components/RenderStaffComponent";
import Header from "./Components/HeaderComponent";
import Footer from "./Components/FooterComponent";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Department, { DepartmentStaffs } from "./Components/DepartmentComponent";
import Payroll from "./Components/PayrollComponent";
import { AddStaff } from "./Components/AddStaff";
import {
  fetchStaffs,
  fetchDepartments,
  fetchPayroll,
  postStaff,
  toggleForm,
  searchStaff,
} from "./redux/ActionCreators";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStaffs());
  }, []);
  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);
  useEffect(() => {
    dispatch(fetchPayroll());
  }, []);

  const staffs = useSelector((state) => state.staffs.staffs);
  const isLoading = useSelector((state) => state.staffs.isLoading);
  const errMess = useSelector((state) => state.staffs.errMess);
  const departments = useSelector((state) => state.departments.departments);
  const departmentsIsLoading = useSelector(
    (state) => state.departments.isLoading
  );
  const departmentsErrMess = useSelector((state) => state.departments.errMess);
  const salary = useSelector((state) => state.salary.payroll);
  const formStatus = useSelector((state) => state.formStatus.formStatus);
  const search = useSelector((state) => state.staffs.search);

  const showForm = () => {
    dispatch(toggleForm());
  };

  const addStaffHandler = (
    staffName,
    staffDob,
    staffSalaryScale,
    staffStartDate,
    staffDepartment,
    staffAnnualLeave,
    overTime = 0,
    salary
  ) => {
    const staffDepartmentId = departments.find(
      (department) => department.name === staffDepartment
    ).id;
    dispatch(
      postStaff(
        staffName,
        staffDob,
        staffSalaryScale,
        staffStartDate,
        staffDepartmentId,
        staffAnnualLeave,
        overTime,
        salary
      )
    );
  };

  const onSearch = (filteredList) => {
    dispatch(searchStaff(filteredList));
  };

  const location = useLocation();

  console.log(location);

  return (
    <div className="App">
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <StaffList
                  staffs={staffs}
                  search={search}
                  isLoading={isLoading}
                  errMess={errMess}
                  onSearch={onSearch}
                  toggleForm={showForm}
                />
              }
            />
            <Route
              path="/phongban"
              element={
                <Department
                  staffs={staffs}
                  departments={departments}
                  isLoading={departmentsIsLoading}
                  errMess={departmentsErrMess}
                />
              }
            ></Route>
            <Route path="/bangluong" element={<Payroll staffs={salary} />} />
            <Route
              exact
              path="/nhanvien"
              element={
                <StaffList
                  staffs={staffs}
                  search={search}
                  isLoading={isLoading}
                  errMess={errMess}
                  onSearch={onSearch}
                  toggleForm={showForm}
                />
              }
            />
            <Route
              path="/nhanvien/:id"
              element={
                <StaffId
                  staffs={staffs}
                  isLoading={isLoading}
                  errMess={errMess}
                  departments={departments}
                />
              }
            />
            <Route
              path="/phongban/:departmentId"
              element={
                <DepartmentStaffs staffs={staffs} departments={departments} />
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <AddStaff
        onAddStaff={addStaffHandler}
        formStatus={formStatus}
        toggleForm={showForm}
      />

      {/* <Footer /> */}
    </div>
  );
}

export default App;
