import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardFooter,
  CardText,
  CardTitle,
} from "reactstrap";

function Payroll(props) {
  const salary = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-md-6 col-lg-4">
        <Card className="m-1">
          <CardTitle>{staff.name}</CardTitle>
          <div className="card-text">
            <div>Mã nhân viên: {staff.id}</div>
            <div>Hệ số lương: {staff.salaryScale}</div>
            <div>Số ngày làm thêm: {staff.overTime}</div>
          </div>
          <CardFooter>
            Lương:{" "}
            {(staff.salaryScale * 3000000 + staff.overTime * 200000).toFixed(0)}
          </CardFooter>
        </Card>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhanvien">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">{salary}</div>
    </div>
  );
}

export default Payroll;
