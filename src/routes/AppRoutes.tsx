import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import MainTabsLayout from '../layouts/MainTabsLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export const AppRoutes: React.FC = () => {
  return (
    <>
      <PublicRoute exact path="/auth/login" component={LoginPage} />
      <PublicRoute exact path="/auth/register" component={RegisterPage} />

      {/* Rutas principales de la app de estudio */}
      <ProtectedRoute path="/app" component={MainTabsLayout} />

      <Route exact path="/">
        <Redirect to="/app/tasks" />
      </Route>
    </>
  );
};

export default AppRoutes;