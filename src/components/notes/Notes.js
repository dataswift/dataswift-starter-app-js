import React, {useContext, useEffect, useState} from 'react';
import {HatClient} from "@dataswift/hat-js";
import "./Notes.scss";
import MyContext from "../context/MyContext";
import {appConfig} from "../../app.config";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const mContext = useContext(MyContext);

    const config = {
        token: mContext.user.token,
        apiVersion: appConfig.hatApiVersion,
        secure: false
    };

    const hat = new HatClient(config);

    const handleChange = (text) => {
        setNewNote(text);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        saveData();
    };

    const saveData = async () => {
        if (!newNote) return;
        const dateCreated = new Date().toISOString();

        const body = {
            value: newNote,
            dateCreated: dateCreated,
        };
        const res = await hat.hatData().create(appConfig.namespace, appConfig.endpoint, body);

        if (res.parsedBody) {
            setNewNote("");
            getData();
        }
    };

    const getData = async () => {
        try {
            const res = await hat.hatData().getAll(appConfig.namespace, appConfig.endpoint, {ordering: 'descending', orderBy: 'dateCreated'});

            if (res.parsedBody) {
                setNotes(res.parsedBody);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteData = async (recordId) => {
        const res = await hat.hatData().delete([recordId]);

        if (res.parsedBody) {
            getData();
        }
    };

    const updateData = async (hatRecord) => {
        hatRecord.data.value += 1;
        const res = await hat.hatData().update([hatRecord]);

        if (res.parsedBody) {
            getData();
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <form onSubmit={e => handleSubmit(e)} className={'notes-wrapper flex-column-wrapper flex-content-center flex-align-items-center'}>
            <div className={'flex-spacer-small'}/>
            <h3>Save a note on your HAT</h3>
            <input
                name={'note'}
                type={'text'}
                placeholder="What's on your mind?"
                autoComplete={'text'}
                value={newNote}
                onChange={e => handleChange(e.target.value)}
            />

            <div className={'flex-spacer-small'}/>

            <button className={'btn btn-accent'} type={'submit'}>Save</button>

            <div className={'flex-spacer-small'}/>

            <ul className={'notes-list'}>
                {notes.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className={'note-row-wrapper'}>
                                <div className={'note-content'}>{item.data.value}</div>
                                <button type={"button"} onClick={() => deleteData(item.recordId)}><i className={'material-icons'}>delete</i></button>
                                <button type={"button"} onClick={() => updateData(item)}><i className={'material-icons'}>edit</i></button>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </form>
    );
}

export default Notes;
