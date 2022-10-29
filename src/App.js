import React from "react";
import "./App.css";
import { useEffect } from "react";
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

  return (
    <div className="App">
      <Header />

      <Routes>
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

      <AddStaff
        onAddStaff={addStaffHandler}
        formStatus={formStatus}
        toggleForm={showForm}
      />

      <Footer />
    </div>
  );
}

export default App;
