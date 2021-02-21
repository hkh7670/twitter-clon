import React, {Fragment} from "react";
import {authService} from "../fbase";
import {useHistory} from "react-router";

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <Fragment>
            <button onClick={onLogOutClick}>Log Out</button>
        </Fragment>
    );
}