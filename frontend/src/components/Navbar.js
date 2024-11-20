import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log('Full userInfo:', userInfo); // Add this debug line

  const logoutHandler = () => {
    dispatch(logout());
  };

  const renderDashboardLink = () => {
    // Add debug logging
    console.log('userInfo:', userInfo);
    console.log('role:', userInfo?.role);

    if (!userInfo || !userInfo.role) {
      console.log('No user info or role found');
      console.log(JSON.parse(localStorage.getItem('userInfo')));
      return null;
    }
    
    // Use lowercase comparison for safety
    const role = userInfo.role.toLowerCase();
    
    switch (role) {
      case 'seller':
        return (
          <LinkContainer to="/seller/dashboard">
            <NavDropdown.Item>Seller Dashboard</NavDropdown.Item>
          </LinkContainer>
        );
      case 'admin':
        return (
          <LinkContainer to="/admin/dashboard">
            <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
          </LinkContainer>
        );
      default:
        console.log('Unknown role:', role);
        return null;
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {renderDashboardLink()}
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;