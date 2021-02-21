import React from "react";
import {authService, firebaseInstance} from "../fbase";
import AuthForm from "../components/AuthForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter, faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {name} = event.target;
        let provider;
        switch (name) {
            case "google":
                provider = new firebaseInstance.auth.GoogleAuthProvider();
                break;

            case "github":
                provider = new firebaseInstance.auth.GithubAuthProvider();
                break;
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{marginBottom: 30}}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle}/>
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with GitHub <FontAwesomeIcon icon={faGithub}/>
                </button>
            </div>
        </div>
    );
}
export default Auth;