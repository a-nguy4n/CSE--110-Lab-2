import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import {ClickCounter} from "./hooksExercise"; 


function App() {
  return (
    <div className='app-container'>
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

        {/* <button>
          x
        </button>
        <h2> 1st Note Title </h2>
        <p> 1st Note Content </p>
        <p> 1st Note Label </p> */}

      <div className="notes-grid">
            {dummyNotesList.map((note) => (
              <div
                key={note.id}
                className="note-item">
                <div className="notes-header">
                  <button>x</button>
                </div>
                <h2> {note.title} </h2>
                <p> {note.content} </p>
                <p> {note.label} </p>
              </div>
            ))}
          </div>
            <ClickCounter/>
        
      </div>
    </div>
 
  );
}

export default App;
