import React, {useContext, useState} from 'react';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { FavoriteNotes, FavoriteColumn } from "./favoriteNotesHook";
import { ToggleTheme } from './themeToggleHook';
import { ThemeContext, themes } from './themeContext';



function App() {

  // *** Liking Notes ***
  // adding state to track list of Fav Notes 
  // handleFav function to add + remove notes from favorited list

  const [favNotes, setFavNotes] = useState<Note[]>([]);
  const handleFavorite = (note: Note) => {
    if(favNotes.some(likedNote => likedNote.id === note.id)){
      setFavNotes(favNotes.filter(likedNote => likedNote.id !== note.id));
    }

    else{
      setFavNotes([...favNotes, note]);
    }
  };

  // *** Toggle Theme ***
  const [currentTheme, setCurrentTheme] = useState(themes.light); 
  
  const changeTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

// *** Create Notes ***

  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);


  return (
    <ThemeContext.Provider value={currentTheme}> 
      <div className='app-container'
       style={{ background: currentTheme.background, color: currentTheme.foreground }}
      >
      <div className="note-individual">
      <form className="note-form">

       <div><input placeholder="Note Title"></input></div>
       <div> <textarea placeholder="Note Content"></textarea></div>
        
        <select name="noteLabel" id="noteLabel">
              <option value="pleaseChoose"> -- Please Choose a Label --</option>
              <option value="personal"> Personal</option>
              <option value="study"> Study</option>
              <option value="toDo"> To-Do's</option>
              <option value="work"> Work</option>
              <option value="test"> Test</option>
              <option value="misc"> Misc.</option>
         </select>
       
       <div><button type="submit">Create Note</button></div>
       </form>

      <div className="notes-grid">
            {dummyNotesList.map((note) => (
              <div
                key={note.id}
                className="note-item">
                <div className="notes-header">
                  <FavoriteNotes 
                  note={note}
                  handleFavorite={handleFavorite}
                  isFavorited={favNotes.some(likedNote => likedNote.id === note.id)}
                  
                  
                  />
                  <button>x</button>
      
                </div>
                <h2> {note.title} </h2>
                <p> {note.content} </p>
                <p> {note.label} </p>
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
