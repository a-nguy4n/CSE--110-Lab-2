import React, {createContext } from 'react';

export const themes = {
 light: {
   foreground: '#000000',
   background: '#eeeeee',
 },
 dark: {
   foreground: '#0047AB',
   background: '#89CFF0', 
 },
};

export const ThemeContext = React.createContext(themes.light);

