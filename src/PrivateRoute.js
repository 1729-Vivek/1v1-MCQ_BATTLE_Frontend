// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={authService.isAuthenticated() ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
