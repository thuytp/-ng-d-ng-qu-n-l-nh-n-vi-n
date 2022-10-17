import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.isNavOpen });
  }

  render() {
    return (
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={this.toggleNav} />
          <NavbarBrand href="/">
            <img
              src="assets/images/logo.png"
              height="30"
              width="41"
              alt="Ứng dụng quản lý nhân viên"
            />
          </NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem className="m-1">
                <NavLink className="nav-link" to="/nhanvien">
                  <span className="fa fa-users fa-lg"></span>Nhân Viên
                </NavLink>
              </NavItem>
              <NavItem className="m-1">
                <NavLink className="nav-link" to="/phongban">
                  <span className="fa fa-home fa-lg"></span>Phòng Ban
                </NavLink>
              </NavItem>
              <NavItem className="m-1">
                <NavLink className="nav-link" to="/bangluong">
                  <span className="fa fa-money fa-lg"></span>Bảng Lương
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
