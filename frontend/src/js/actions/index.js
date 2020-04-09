import axios from 'axios';
import { debounce } from 'lodash';
import {LOAD_NOTES, ADD_NOTE, SELECT_NOTE, DELETE_NOTE, UPDATE_NOTE} from '../constants/action-types';

export function loadNotes() {
    return function(dispatch) {
        return axios.get('/notes/').then(response => {
            dispatch({ type: LOAD_NOTES, payload: response.data });
        });
    };
}

export function addNote(payload) {
    return function(dispatch) {
        return axios.post('/notes/', payload).then(response => {
            dispatch({ type: ADD_NOTE, payload: response.data });
        });
    };
}

export const debouncedUpdateNote = debounce((resolve, reject, payload, dispatch) => {
    return axios.put('/notes/' + payload.id + '/', payload).then(response => {
        dispatch({ type: UPDATE_NOTE, payload: response.data });
        resolve(response);
    }).catch(error => reject(error));
}, 1000);

export function updateNote(payload) {
    return function(dispatch) {
        dispatch({ type: UPDATE_NOTE, payload });
        return new Promise((resolve, reject) => debouncedUpdateNote(resolve, reject, payload, dispatch));
    };
}

export function selectNote(payload) {
    return { type: SELECT_NOTE, payload }
}

export function deleteNote(payload) {
    return function(dispatch) {
        return axios.delete('/notes/' + payload.id).then(response => {
            dispatch({ type: DELETE_NOTE, payload: payload })
        });
    }
}