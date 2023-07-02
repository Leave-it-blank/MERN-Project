import React from 'react';
import '../styles/LayoutStyles.css';
import { SideBarMenu } from '../Data/data';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Hospital App</h6>
              <hr />
            </div>
            <div className="menu">
              {SideBarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={index}
                    className={`menu-item ${isActive && 'active'}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className={'menu-item '}>
                <i className={'fa-solid fa-arrow-right-from-bracket'}></i>
                <button className='logout cursor-pointer'
                  onClick={() => {
                    console.log('Logout');
                    dispatch(setUser(null));
                    localStorage.removeItem('token');
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">Header</div>
            <div className="header-content">
              <i className="fa-sharp fa-solid fa-bell"></i>
              <Link to="/profile">{user?.name}</Link>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
