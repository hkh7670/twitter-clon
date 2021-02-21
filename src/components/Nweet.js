import React, {useState} from "react";
import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok) {
            // delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            // const attachmentRef = storageService.ref().child(`${nweetObj.creatorId}/${nweetObj.id}`);
            // const response = await attachmentRef.delete()
            window.alert("Delete successful!");
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const ok = window.confirm("Are you sure you want to edit this nweet?");
        if(ok) {
            // edit nweet
            await dbService.doc(`nweets/${nweetObj.id}`).update({
                text: newNweet,
                updatedAt: Date.now(),
            })
            toggleEditing();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {value} = event.target;
        setNewNweet(value);
    }

    return (
        <div>
            {editing ? (
                <>
                    {isOwner && <>
                        <form onSubmit={onSubmit}>
                            <input value={newNweet} onChange={onChange} required type="text" maxLength={120}
                                   placeholder="Edit your nweet"/>
                            <input type="submit" value="Edit Nweet"/>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>}
                </>
                ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="100px" height="100px"/>}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;