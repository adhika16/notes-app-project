import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./notes.css";
import Note from "../../interfaces/note-interface";
import { getNotes, createNote, updateNote, deleteNote } from "../../services/message.service";
import AlertMessage from "../alert/alert";

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await getNotes(accessToken);

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        const notes: Note[] = data || [];
        setNotes(notes);
      } catch (e) {
        setErrorMessage("Something went wrong. Please try again.");
        console.log(e);
      }
    };

    fetchNotes();
  }, [getAccessTokenSilently]);

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await createNote(accessToken, {
        title,
        content,
        userId: user?.sub,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const newNote = data;
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(e);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await updateNote(accessToken, {
        id: selectedNote.id,
        title,
        content,
        userId: user?.sub,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const updatedNote = data;

      const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      setErrorMessage("Something went wrong. Please try again.");
      console.log(e);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleDeleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await deleteNote(accessToken, noteId);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const updatedNotes = notes.filter((note) => note.id !== noteId);

      setNotes(updatedNotes);
    } catch (e) {
      setErrorMessage("Something went wrong. Please try again.");
      console.log(e);
    }
  };

  return (
    <div className="content-layout">
      {errorMessage !== "" && <AlertMessage status="danger" message={errorMessage}/>}
      <div className="app-container">
        <form className="note-form" onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" required></input>
          <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Content" rows={10} required></textarea>
          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-item" onClick={() => handleNoteClick(note)}>
              <div className="notes-header">
                <button onClick={(event) => handleDeleteNote(event, note.id)}>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
