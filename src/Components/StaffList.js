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
        <Card>
          <Link to={`/nhanvien/${staff.id}`}>
            <CardImg src={staff.image} />
          </Link>
          <h5 className="text-center">{staff.name}</h5>
        </Card>
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
          <div className="">
            <h2>Nhân Viên</h2>
          </div>

          <div className="">
            <Form onSubmit={handleSubmit}>
              <input
                type="text"
                ref={searchInputRef}
                style={{ marginRight: "10px" }}
              ></input>
              <Button type="submit" className="button-custom">
                Tìm
              </Button>
            </Form>
          </div>
        </div>
        <div className="row">
          {" "}
          <StaffName
            list={props.search.length !== 0 ? props.search : props.staffs}
          />
          <div
            className="col-6 col-md-4 col-lg-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={props.toggleForm} className="button-custom ">
              <span className="fa fa-plus fa-lg " />
            </Button>
          </div>
        </div>
      </div>
    );
}

export default StaffList;
