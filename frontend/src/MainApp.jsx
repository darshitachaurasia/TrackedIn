import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Landing from './components/Landing'; // Assuming you have a Home component
import Dashboard from './components/Dashboard';
import Landing from './components/Landing'; // Assuming you have a Home component
import Login from './pages/SignInPage'; // Assuming you have a Login component
import Signup from './pages/SignUpPage'; // Assuming you have a Signup component
// import NotFound from './pages'; // Optional but recommended

const MainApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default MainApp;
