import React, {useContext, useEffect, useState} from 'react';
import { ThemeContext, themes } from "./themeContext";
import {Label, Note} from "./types";

export function FavoriteNotes({
  note,
  handleFavorite,
  isFavorited,
}: {
  note: Note;
  handleFavorite: (note: Note) => void;
  isFavorited: boolean;
}) {
  const handleClick = () => {
    handleFavorite(note);
  };

  return (
    <div className="likedNote">
      <button
        className="heartButton"
        onClick={handleClick}
        style={{
          color: isFavorited ? 'red' : 'white',
          fontSize: '24px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer'
        }}
      >
        {isFavorited ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

// define type for props
type FavoriteColumnProps = {
  favNotes : Note[];
}

export function FavoriteColumn({ favNotes }: FavoriteColumnProps) {
  return (
    <div className="favoritedColumn">
      <h2>List of Favorites</h2>
      {favNotes.length > 0 ? (
        <ul>
          {favNotes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      ) : (
        <p>No notes favorited yet.</p>
      )}
    </div>
  );
}

