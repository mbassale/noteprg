import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

import '../scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import NoteApp from './components/NoteApp';
import store from './store/index';

const wrapper = document.getElementById('NoteApp');
wrapper ? ReactDOM.render(
    <Provider store={store}>
        <NoteApp />
    </Provider>,
    wrapper) : false;