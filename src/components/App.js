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
                setUserObj({
                    uid: user.uid,
                    displayName: user.displayName,
                    updateProfile: (args) => user.updateProfile(args),
                });
            }
            else {
                setIsLoggedIn(false);
                setUserObj(null);
            }
            setInit(true);
        });
    }, [])

    const refreshUser = () => {
        console.log(authService.currentUser);
        const user = authService.currentUser;
        const userObj = {
            uid: user.uid,
            displayName: user.displayName,
            updateProfile: (arge) => user.updateProfile(arge),
        };
        setUserObj(userObj);
    }

    return (
        <Fragment>
            {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj = {userObj}/> : "Initializing..."}
            {/*<footer>&copy; {new Date().getFullYear()} Twitter</footer>*/}
        </Fragment>
    );
}

export default App;
