import React, { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/scrollToTop';
import SidebarLayout from './components/Sidebar/Sidebar';
import CheckEmail from './pages/CheckEmail';
import ConfirmEmail from './pages/ConfirmEmail';

// routes
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import { NothingFoundBackground } from './pages/NotFound404';
import Register from './pages/Register';


function App() {
  return (
    <>  
      <BrowserRouter>
        <ScrollToTop/>
        <Routes >
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/register/confirmEmail" element={<ConfirmEmail />} />
          <Route path="/forgotPassword/checkEmail" element={<CheckEmail />} />
          <Route  element={<SidebarLayout />} >
            <Route 
              path="/app" 
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/app/exercise" 
              element={
                <ProtectedRoute>
                  <Exercises/>
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path = "*" element={<NothingFoundBackground/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
