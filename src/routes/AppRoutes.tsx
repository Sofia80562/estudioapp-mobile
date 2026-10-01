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
      {/* Redirecciones útiles por si entran directo a las rutas cortas */}
      <Route exact path="/login">
        <Redirect to="/auth/login" />
      </Route>
      <Route exact path="/register">
        <Redirect to="/auth/register" />
      </Route>

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