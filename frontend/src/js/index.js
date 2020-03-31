import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

import '../scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import NoteApp from './components/NoteApp';

const wrapper = document.getElementById('NoteApp');
wrapper ? ReactDOM.render(<NoteApp />, wrapper) : false;