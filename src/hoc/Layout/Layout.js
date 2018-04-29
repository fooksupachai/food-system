import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom';


class Layout extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">ระบบจัดการสินค้า</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/topup"  activeClassName="active" tag={RRNavLink}>เติมเงิน</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" exact activeClassName="active" tag={RRNavLink}>เลือกสินค้า</NavLink>
                                
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                    </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavItem>
                                                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavItem>
                                                    <NavLink to="/checkout"  activeClassName="active" tag={RRNavLink}>จ่ายเงิน</NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavItem>
                                                    <NavLink to="/stock"  activeClassName="active" tag={RRNavLink}>รายการที่ชำระแล้ว</NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                    <NavLink to="/login"  activeClassName="active" tag={RRNavLink}>Log out</NavLink>
                            </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div className="row">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}


export default Layout;