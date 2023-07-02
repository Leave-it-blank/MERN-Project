import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute ({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');
  console.log(user);
  console.log(token);
  useEffect(() => {
    const getUserData = async () => {
      try {
        showLoading();
        const res = await axios.post(
          '/api/v1/user/getUserData',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        );
        if (res.data.success) {
          hideLoading();
          dispatch(setUser(res.data.data));
        } else {
          <Navigate to="/login" />;
        }
        // console.log(res.data);
      } catch (error) {
        hideLoading();
        console.log(error);
      }
    };
    getUserData();
  }, [dispatch, token]);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
