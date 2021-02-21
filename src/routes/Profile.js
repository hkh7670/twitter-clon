import React, {useEffect, useState} from "react";
import {authService, dbService} from "../fbase";
import {useHistory} from "react-router";

export default ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(nweets);
        console.log(nweets.docs.map(doc => doc.data()));
    }

    const onChange = (event) => {
        const {value} = event.target;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            const response = await userObj.updateProfile({
                displayName: newDisplayName
            });
            console.log(response);
        }
    }

    useEffect(() => {
        getMyNweets();
    }, [])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}