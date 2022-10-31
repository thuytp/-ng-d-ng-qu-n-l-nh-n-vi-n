import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { StaffName } from "./StaffList";

function Department(props) {
  const department = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-md-6 col-lg-4">
        <Card className="m-1">
          <Link to={`/phongban/${department.id}`}>
            <CardTitle>{department.name}</CardTitle>
          </Link>
          <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </Card>
      </div>
    );
  });

  if (props.isLoading)
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  else if (props.errMess)
    return (
      <div className="container">
        <div className="row">{props.errMess}</div>
      </div>
    );
  else if (props.departments !== null)
    return (
      <div className="container">
        <div className="row">{department}</div>
      </div>
    );
}

export const DepartmentStaffs = (props) => {
  const { departmentId } = useParams();
  const departmentStaffs = props.staffs.filter(
    (staff) => staff.departmentId === departmentId
  );
  const activeDept = props.departments.find(
    (department) => department.id === departmentStaffs[0].departmentId
  );

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/phongban">Phòng ban</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{activeDept.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <StaffName list={departmentStaffs} />
      </div>
    </div>
  );
};

export default Department;
