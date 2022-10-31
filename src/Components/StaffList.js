import { Card, CardImg, Form, Button } from "reactstrap";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { Loading } from "./LoadingComponent";

export const StaffName = (props) =>
  props.list.map((staff) => {
    return (
      <div
        key={staff.id}
        className="col-6 col-md-4 col-lg-2"
        style={{ margin: "10px 0px" }}
      >
        <Link to={`/nhanvien/${staff.id}`}>
          <Card>
            <CardImg src={staff.image} />
            <h5 className="text-center">{staff.name}</h5>
          </Card>
        </Link>
      </div>
    );
  });

function StaffList(props) {
  const searchInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredSearchInput = searchInputRef.current.value;

    const filtered = props.staffs.filter((staff) => {
      const searchInput = enteredSearchInput.toLowerCase();
      return staff.name?.toLowerCase().includes(searchInput);
    });

    props.onSearch(filtered);

    searchInputRef.current.value = "";
  };

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.staffs != null)
    return (
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-5 col-lg-5">
            <h2>Nhân Viên</h2>
          </div>
          <div className="col-xs-12.text-left col-md-2 col-lg-2 text-lg-center">
            <Button onClick={props.toggleForm}>
              <span className="fa fa-plus fa-lg " />
            </Button>
          </div>
          <div className="col-12.text-left col-md-5 col-lg-5 text-lg-right">
            <Form onSubmit={handleSubmit}>
              <input type="text" ref={searchInputRef}></input>
              <Button type="submit">Tìm</Button>
            </Form>
          </div>
        </div>
        <div className="row">
          {" "}
          <StaffName
            list={props.search.length !== 0 ? props.search : props.staffs}
          />
        </div>
      </div>
    );
}

export default StaffList;
