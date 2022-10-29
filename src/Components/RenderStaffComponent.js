import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardText,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { Loading } from "./LoadingComponent";

function RenderStaff(props) {
  const birthDay = new Date(props.staff.doB);
  const startDate = new Date(props.staff.startDate);
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhanvien">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row m-1">
        <div className="col-12 col-md-4 col-lg-3">
          <CardImg src={props.staff.image} alt={props.staff.name} />
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          <Card className="text-left border-0">
            <h4>Họ và tên: {props.staff.name}</h4>
            <CardText>Ngày sinh: {dateFormat(birthDay, "dd/mm/yyyy")}</CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(startDate, "dd/mm/yyyy")}{" "}
            </CardText>
            <CardText>Phòng ban: {props.department.name}</CardText>
            <CardText>
              Số ngày nghỉ còn lại: {props.staff.annualLeave}{" "}
            </CardText>
            <CardText>Số ngày đã làm thêm: {props.staff.overTime} </CardText>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StaffId(props) {
  const { id } = useParams();
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
      <RenderStaff
        staff={props.staffs.find((item) => item.id === parseInt(id, 10))}
        department={props.departments.find(
          (department) => department.id === props.staffs[id].departmentId
        )}
      />
    );
}

export default StaffId;
