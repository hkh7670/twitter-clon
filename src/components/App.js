import React, {useState, useEffect, Fragment} from "react";
import AppRouter from "components/AppRouter";
import {authService} from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if(user) {
                setIsLoggedIn(true);
                setUserObj(user);
            }
            else {
                setIsLoggedIn(false);
                setUserObj(null);
            }
            setInit(true);
        });
    }, [])
    return (
        <Fragment>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj = {userObj}/> : "Initializing..."}
            {/*<footer>&copy; {new Date().getFullYear()} Twitter</footer>*/}
        </Fragment>
    );
}

export default App;
