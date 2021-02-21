import React, {useState} from "react";
import {dbService, storageService} from "../fbase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {editing ? (
                <>
                    {isOwner && <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input value={newNweet} onChange={onChange} required type="text" maxLength={120}
                                   placeholder="Edit your nweet" autoFocus className="formInput"/>
                            <input type="submit" value="Edit Nweet" className="formBtn"/>
                        </form>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                    </>}
                </>
                ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;