import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <NavLink to="/" exact activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/cart" activeClassName="active">
        Cart
      </NavLink>
      {userInfo ? (
        <>
          <NavLink to="/profile" activeClassName="active">
            {userInfo.name}
          </NavLink>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;