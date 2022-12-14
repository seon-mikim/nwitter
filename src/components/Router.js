import React, { useState } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../router/Auth";
import Home from "../router/Home";
import Navigation from "components/Navigation";
import Profile from "router/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  
    return <Router>
        {isLoggedIn && <Navigation/>}
        <Routes>
            {isLoggedIn ? (
            <>
                <Route path="/" element={<Home userObj = {userObj} />}/>
                <Route path="/profile" element={<Profile />}/>
      
        
            </>
            ):(
            <Route  path="/" element={ <Auth />}/>
               
             )}
        </Routes>
    </Router>
};

export default AppRouter;