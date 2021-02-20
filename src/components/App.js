import React, {useState} from "react";
import AppRouter from "components/AppRouter";
import {authService} from "fbase";

function App() {
    // authService.currentUser
    console.log("currentUser : " + authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    return <AppRouter isLoggedIn={isLoggedIn}/>;
}

export default App;
