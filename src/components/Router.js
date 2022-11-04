import React, { useState } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../router/Auth";
import Home from "../router/Home";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return <Router>
        <Routes>
            {isLoggedIn ? (
            <>
                <Route path="/" element={<Home />}/>
                    
        
            </>
            ):(
            <Route  path="/" element={ <Auth />}/>
               
             )}
        </Routes>
    </Router>
};

export default AppRouter;