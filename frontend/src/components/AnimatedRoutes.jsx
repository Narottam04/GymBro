import { AnimatePresence } from "framer-motion"

import ProtectedRoute from './ProtectedRoute';
import SidebarLayout from './Sidebar/Sidebar';
import CheckEmail from '../pages/CheckEmail';
import ConfirmEmail from '../pages/ConfirmEmail';

// routes
import Dashboard from '../pages/Dashboard';
import Exercises from '../pages/Exercises';
import ForgotPassword from '../pages/ForgotPassword';
import IndividualExercise from '../pages/IndividualExercise';
import Login from '../pages/Login';
import { NothingFoundBackground } from '../pages/NotFound404';
import Register from '../pages/Register';
import { Route, Routes, useLocation } from "react-router-dom";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
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
                <Route 
                path="/app/exercise/:id" 
                element={
                    <ProtectedRoute>
                    <IndividualExercise/>
                    </ProtectedRoute>
                } 
                />
            </Route>
        <Route path = "*" element={<NothingFoundBackground/>} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes