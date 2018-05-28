import React from 'react';
import './Controls.css'
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (props) =>{
    return (
            <div>
                <Navbar className="navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" color="light" light expand="md">
                    <NavbarBrand className="col-md-2 NavLink" href="/">Steward Platform</NavbarBrand>
                    <NavbarToggler />
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={props.click}>Reset</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
    );
};

export default Header;

/* <NavItem>
                       <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                   </NavItem>*/