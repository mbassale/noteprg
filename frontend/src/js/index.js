import React from 'react';
import ReactDOM from 'react-dom';
import NoteApp from './components/NoteApp';

const wrapper = document.getElementById('NoteApp');
wrapper ? ReactDOM.render(<NoteApp />, wrapper) : false;