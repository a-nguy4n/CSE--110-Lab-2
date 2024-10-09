import React, {useContext, useEffect, useState} from 'react';
import { ThemeContext, themes } from "./themeContext";
import {Label, Note} from "./types";

export function FavoriteNotes( {note}: {note: Note}){
   // creating the "heart" like button

   const[favorited, setFav] = useState(false); 
   
   const handleClick = () => {
    setFav(!favorited);
   };
    
   return( 
    <div className='likedNote'>
      <button 
        className="heartButton"
        onClick = {handleClick}
        style={{
          color: favorited ? 'red' : 'white',
          fontSize: '24px',
          border: 'none',
          background:'transparent',
          cursor:'pointer'
        }}
     >

      {favorited ? '❤️' : '🤍'}

    </button>
   
    </div>

   );
}

export function FavoriteColumn(){
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]> ([]);

  const handleFavorite = (note: Note) => {
    if (favoriteNotes.some((favNote) => favNote.id === note.id)) {
     
      setFavoriteNotes(favoriteNotes.filter((favNote) => favNote.id !== note.id));
    } else {

      setFavoriteNotes([...favoriteNotes, note]);
    }
  };

  return(
    <div className="favoritedColumn">
      <h2>List of Favorites</h2>
      {favoriteNotes.length > 0 ? (
        <ul>
          {favoriteNotes.map((note) => (<li key={note.id}>{note.title}</li>))}
        </ul>

      ) 
      : (
        <p>No notes favorited yet.</p>
      )}

    </div>
  )









}

  
  