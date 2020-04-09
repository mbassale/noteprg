import axios from 'axios';
import { LOAD_NOTES, ADD_NOTE, SELECT_NOTE, DELETE_NOTE } from '../constants/action-types';

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