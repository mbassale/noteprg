import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

import '../scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import NoteApp from './components/NoteApp';
import ColorHelperApp from './components/ColorHelperApp';
import store from './store/index';

const noteApp = document.getElementById('NoteApp');
noteApp ? ReactDOM.render(
    <Provider store={store}>
        <NoteApp />
    </Provider>,
    noteApp) : false;

const colorHelperApp = document.getElementById('ColorHelperApp');
colorHelperApp ? ReactDOM.render(
    <Provider store={store}>
        <ColorHelperApp />
    </Provider>,
    colorHelperApp) : false;
