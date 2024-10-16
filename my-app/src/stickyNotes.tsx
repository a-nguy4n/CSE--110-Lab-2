import React, { useContext, useState } from 'react';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { FavoriteNotes, FavoriteColumn } from "./favoriteNotesHook";
import { ToggleTheme } from './themeToggleHook';
import { ThemeContext, themes } from './themeContext';

export const StickyNotes = () =>{

    // State for favorite notes
  const [favNotes, setFavNotes] = useState<Note[]>([]);
  
  // State for notes
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  
  // Initial note state
  // used to reset the note creation after form is submitted 
  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    fontStyle: 'Arial',
    fontColor: '#000000'
  };

  const [createNote, setCreateNote] = useState<Note>(initialNote);
  
  // Handle adding/removing favorited notes
  const handleFavorite = (note: Note) => {
    if (favNotes.some(likedNote => likedNote.id === note.id)) {
      setFavNotes(favNotes.filter(likedNote => likedNote.id !== note.id));
    } else {
      setFavNotes([...favNotes, note]);
      setCreateNote(initialNote);
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
    const newNote = {
      ...createNote, 
      id: Date.now(),
      fontColor: createNote.fontColor,
      fontStyle: createNote.fontStyle,
    };
    setNotes([...notes, newNote]); // Add the new note to the notes list
    setCreateNote(initialNote); // Reset createNote state
  };

  //Delete note handler
  // deletes note by its ID, also removes it from the "favorite section"
  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => note.id !== id)); // Remove the note w/ specified id
    setFavNotes(favNotes.filter(likedNote => likedNote.id !== id)); // Removes note from favs
  };

  //Update note handler for editable content 
  // Edits Made to: Font Style, Font Color, title, label, content
  const updateNoteHandler = (id: number, updatedNote: Partial<Note>) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNotes(updatedNotes);

    // Update the favorite notes if the note is in favNotes
    const updatedFavNotes = favNotes.map(favNote =>
      favNote.id === id ? { ...favNote, ...updatedNote } : favNote
    );
    setFavNotes(updatedFavNotes);
  };

  return (
    <ThemeContext.Provider value={currentTheme}> 
        <div className='app-container'
               style={{ background: currentTheme.background, 
                        color: currentTheme.foreground }} 
                >
          <div className="note-individual" >
            <form className="note-form" onSubmit={createNoteHandler}>
              <div>
                <input
                  placeholder="Note Title"
                  value={createNote.title}
                  onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}
                  required
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Note Content"
                  value={createNote.content}
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
            
              <div>
                <label>Font Color: </label>
                <input  
                  type="color"
                  value={createNote.fontColor}
                  onChange={(event) => setCreateNote({...createNote, fontColor: event.target.value})}
                  >
                  </input>
              </div>
             
              <div>
                <label>Font Style: </label>
                <select 
                  value={createNote.fontStyle}
                  onChange={(event) => setCreateNote({...createNote, fontStyle: event.target.value})}
                >
                  <option value="Arial"> Arial </option>
                  <option value="Times New Roman"> Times New Roman</option>
                  <option value="Courier New"> Courier New </option>
                  <option value="Georgia"> Georgia </option>
                  <option value="Poppins"> Poppins </option>
                
                </select>
              </div>

              <div><button type="submit">Create Note</button></div>
            </form>

            <div className="notes-grid" 
                  style={{ background: currentTheme.background, 
                           color: currentTheme.foreground}}>
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
                  <h2 contentEditable="true"
                       style={{ color: note.fontColor, fontFamily: note.fontStyle }}
                       onBlur={(event) => updateNoteHandler(note.id, { title: event.target.innerText })}
                  >
                    {note.title}  
                  </h2>
                 
                  <p contentEditable="true"
                     style={{ whiteSpace: 'pre-wrap', color: note.fontColor, fontFamily: note.fontStyle }}
                     onBlur={(event) => updateNoteHandler(note.id, { title: event.target.innerText })}
                  >
                    {note.content}
                  </p>
                 
                  <p className='label'
                     contentEditable="true"
                     style={{ color: note.fontColor, fontFamily: note.fontStyle }}
                     
                  >
                    {note.label}
                  </p>
                
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