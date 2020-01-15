import React, { useContext, useEffect, useState } from 'react';
import { HatClient } from '@dataswift/hat-js';
import './Notes.scss';
import MyContext from '../context/MyContext';
import { appConfig } from '../../app.config';

/**
 * Notes
 *
 * This is the Notes function component, it is accessible at the '/' route when
 * the user is authenticated.
 *
 * This is an example of how to read / write / update / delete data from the HAT.
 */
function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const mContext = useContext(MyContext);
  const notesEndpoint = 'starter-app-js-notes';

  const config = {
    token: mContext.user.token,
    apiVersion: appConfig.hatApiVersion,
    secure: appConfig.secure,
  };

  const hat = new HatClient(config);

  const handleChange = event => {
    setNewNote(event.target.value);
  };

  const handleSubmit = event => {
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
    const res = await hat.hatData().create(appConfig.namespace, notesEndpoint, body);

    if (res.parsedBody) {
      setNewNote('');
      fetchNotes();
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await hat
        .hatData()
        .getAll(appConfig.namespace, notesEndpoint, { ordering: 'descending', orderBy: 'dateCreated' });

      if (res.parsedBody) {
        setNotes(res.parsedBody);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = async recordId => {
    try {
      const res = await hat.hatData().delete([recordId]);

      if (res.parsedBody) {
        fetchNotes();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateData = async hatRecord => {
    hatRecord.data.value += 1;
    try {
      const res = await hat.hatData().update([hatRecord]);

      if (res.parsedBody) {
        fetchNotes();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <form
      onSubmit={e => handleSubmit(e)}
      className={'notes-wrapper flex-column-wrapper flex-content-center flex-align-items-center'}
    >
      <div className={'flex-spacer-small'} />
      <h3>Save a note on your HAT</h3>
      <input
        name={'note'}
        type={'text'}
        placeholder="What's on your mind?"
        autoComplete={'text'}
        value={newNote}
        onChange={e => handleChange(e)}
      />

      <div className={'flex-spacer-small'} />

      <button className={'btn btn-accent'} type={'submit'}>
        Save
      </button>

      <div className={'flex-spacer-small'} />

      <ul className={'notes-list'}>
        {notes.map((item, index) => {
          return (
            <li key={index}>
              <div className={'note-row-wrapper'}>
                <div className={'note-content'}>{item.data.value}</div>
                <button type={'button'} onClick={() => deleteData(item.recordId)}>
                  <i className={'material-icons'}>delete</i>
                </button>
                <button type={'button'} onClick={() => updateData(item)}>
                  <i className={'material-icons'}>edit</i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default Notes;
