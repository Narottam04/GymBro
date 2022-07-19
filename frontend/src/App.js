import React, { useState } from 'react';

import {BrowserRouter} from "react-router-dom";

// All routes
import AnimatedRoutes from './components/AnimatedRoutes';

import ScrollToTop from './components/scrollToTop';


function App() {
  
  
  return (
    <>  
      <BrowserRouter>
        <ScrollToTop/>
        <AnimatedRoutes/>
      </BrowserRouter>
    </>
  );
}

export default App;
