import React, { useContext, useState } from 'react';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { FavoriteNotes, FavoriteColumn } from "./favoriteNotesHook";
import { ToggleTheme } from './themeToggleHook';
import { ThemeContext, themes } from './themeContext';

function App() {
  // State for favorite notes
  const [favNotes, setFavNotes] = useState<Note[]>([]);
  
  // State for notes
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  
  // Initial note state
  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };

  const [createNote, setCreateNote] = useState<Note>(initialNote);
  
  // Handle adding/removing favorite notes
  const handleFavorite = (note: Note) => {
    if (favNotes.some(likedNote => likedNote.id === note.id)) {
      setFavNotes(favNotes.filter(likedNote => likedNote.id !== note.id));
    } else {
      setFavNotes([...favNotes, note]);
    }
  };

  // Toggle theme
  const [currentTheme, setCurrentTheme] = useState(themes.light); 
  const changeTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  // Create note handler
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    const newNote = {...createNote, id: notes.length,};
    setNotes([...notes, newNote]); // Add the new note to the notes list
    setCreateNote(initialNote); // Reset createNote state
  };

  //Delete note handler
  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => note.id !== id)); // Remove the note w/ specified id
    setFavNotes(favNotes.filter(likedNote => likedNote.id !== id)); // Removes note from favs
  };

  return (
    <ThemeContext.Provider value={currentTheme}> 
        <div className='app-container'>
          <div className="note-individual" >
            <form className="note-form" onSubmit={createNoteHandler}>
              <div>
                <input
                  placeholder="Note Title"
                  onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}
                  required
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Note Content"
                  onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })}
                  required
                />
              </div>
            
              <div>
                <select
                  onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label })}
                  required
                >
                  <option value={Label.other}>-- Please Choose a Label --</option>
                  <option value={Label.personal}>Personal</option>
                  <option value={Label.study}>Study</option>
                  <option value={Label.work}>Work</option>
                  <option value={Label.toDo}>To Do's</option>
                  <option value={Label.random}>Random</option>
                </select>
              </div>
            
              <div><button type="submit">Create Note</button></div>
            </form>

            <div className="notes-grid" style={{ background: currentTheme.background, color: currentTheme.foreground}}>
              {notes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="notes-header">
                    <FavoriteNotes 
                      note={note}
                      handleFavorite={handleFavorite}
                      isFavorited={favNotes.some(likedNote => likedNote.id === note.id)}
                    />
                    <button onClick={() => deleteNoteHandler(note.id)}>x</button>
                  </div>
                  <h2 contentEditable="true">{note.title}</h2>
                  <p contentEditable="true">{note.content}</p>
                  <p contentEditable="true">{note.label}</p>
                </div>
              ))}
            </div>
            
            <FavoriteColumn favNotes={favNotes}/>
            <ToggleTheme changeTheme={changeTheme}/>
          </div>
        </div> 
    </ThemeContext.Provider>
  );
}

export default App;
