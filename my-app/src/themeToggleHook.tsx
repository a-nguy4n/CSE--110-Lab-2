// themeToggleHook.tsx
import React, { useState, useContext} from 'react';
import { ThemeContext, themes } from "./themeContext";

type ToggleThemeProps = {
    changeTheme: () => void; // Declare the toggleTheme prop type
  };

export function ToggleTheme({ changeTheme }: ToggleThemeProps) {
    const currentTheme = useContext(ThemeContext); // Use the ThemeContext to get the current theme
  
    return (
      <button
        className="ToggleThemeButton"
        onClick={changeTheme} // Update to use changeTheme
        style={{ background: currentTheme.background, 
                 color: currentTheme.foreground }} // Apply styles based on the current theme
      >
        Toggle Theme
      </button>
    );
  }

export default ToggleTheme;


