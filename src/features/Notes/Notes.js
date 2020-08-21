import React, { useContext, useEffect, useState } from 'react';
import { HatClient } from '@dataswift/hat-js';
import './Notes.scss';
import { appConfig } from '../../app.config';
import AuthContext from '../../components/context/AuthContext';

/**
 * Notes
 *
 * This is the Notes function component, it is accessible at the '/' route when
 * the user is authenticated.
 *
 * This is an example of how to read / write / update / delete data from the HAT.
 */
function Notes() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const authContext = useContext(AuthContext);
  const notesEndpoint = 'my-notes';

  const config = {
    token: authContext.user.token,
    apiVersion: appConfig.hatApiVersion,
    secure: appConfig.secure,
  };

  const hat = new HatClient(config);

  const handleChange = event => {
    setNewNote(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createData();
  };

  const createData = async () => {
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

  const updateData = async hatRecord => {
    const noteIndex = notes.indexOf(hatRecord);
    hatRecord.data.value += '!';
    try {
      const res = await hat.hatData().update([hatRecord]);

      if (res.parsedBody) {
        setNotes(prevNotes => {
          const draft = [...prevNotes];
          draft[noteIndex] = res.parsedBody[0];
          return draft;
        });
      }
    } catch (e) {
      console.log(e.cause + e.status);
    }
  };

  const deleteData = async recordId => {
    try {
      const res = await hat.hatData().delete([recordId]);

      if (res.parsedBody) {
        setNotes(prevNotes => {
          // Find index to remove from the Note array
          const index = prevNotes.findIndex(note => note.recordId === recordId);

          if (index !== -1) {
            const draft = [...prevNotes];
            draft.splice(index, 1);
            return draft;
          } else {
            return prevNotes;
          }
        });
      }
    } catch (e) {
      console.log(e.cause + e.status);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await hat.hatData().getAllDefault(appConfig.namespace, notesEndpoint);

      if (res.parsedBody) {
        setNotes(res.parsedBody);
      }
    } catch (e) {
      console.log(e.cause + e.status);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListNotes = () =>
    notes
      .sort((a, b) => new Date(b.data.dateCreated) - new Date(a.data.dateCreated))
      .map((item, index) => {
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
      });

  return (
    <form
      onSubmit={e => handleSubmit(e)}
      className={'notes-wrapper flex-column-wrapper flex-content-center flex-align-items-center'}
    >
      <div className={'flex-spacer-small'} />
      <h3>Write a note on your PDA</h3>
      <input
        name={'note'}
        type={'text'}
        placeholder="Remember to ..."
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
        <ListNotes />
      </ul>
    </form>
  );
}

export default Notes;
