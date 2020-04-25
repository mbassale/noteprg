import _ from 'lodash';
import {ADD_NOTE, LOAD_NOTES, SELECT_NOTE, DELETE_NOTE, UPDATE_NOTE, LOAD_USER} from '../constants/action-types';

const initialState = {
    isLoading: false,
    user: null,
    notes: [],
    selectedNoteId: null,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOAD_NOTES:
            return {
                ...state,
                notes: action.payload
            };
        case SELECT_NOTE:
            return {
                ...state,
                selectedNoteId: _.isObject(action.payload) ? action.payload.id : action.payload
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: state.notes.concat(action.payload)
            };
        case UPDATE_NOTE: {
            const updatedNotes = [...state.notes];
            const updatedNoteIndex = updatedNotes.findIndex(note => note.id === action.payload.id);
            if (updatedNoteIndex >= 0) {
                updatedNotes.splice(updatedNoteIndex, 1, action.payload);
                return {
                    ...state,
                    notes: updatedNotes
                };
            }
            break;
        }
        case DELETE_NOTE: {
            const updatedNotes = [...state.notes].filter(note => note.id !== action.payload.id);
            const newSelectedNoteId = state.selectedNoteId === action.payload.id ? null : state.selectedNoteId;
            return {
                ...state,
                notes: updatedNotes,
                selectedNoteId: newSelectedNoteId
            };
        }
    }
    return state;
}

export default rootReducer;