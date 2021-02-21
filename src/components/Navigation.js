import React from "react";
import {Link} from "react-router-dom";

const Nagivation = ({userObj}) =>
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userObj && userObj.displayName} 's Profile</Link>
            </li>
        </ul>
    </nav>;

export default Nagivation;