import _ from 'lodash';
import axios from 'axios';
import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import NoteList from './note/NoteList';
import NoteEditor from './note/NoteEditor';
import styles from './NoteApp.css';

const NEW_NOTE_PREFIX = 'New Note';

class NoteApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isProcessing: false,
            notes: [],
            selectedNoteId: null
        };
    }

    generateNewNoteName() {
        const noteNumbers = this.state.notes.map(note => {
            const matches = /New Note\s?(\d*)/.exec(note.name);
            if (matches && matches.length > 1) {
                if (matches[1]) {
                    return parseInt(matches[1]);
                }
            }
            return null;
        }).filter(n => n > 0);
        if (noteNumbers.length > 0) {
            return NEW_NOTE_PREFIX + ' ' + (_.max(noteNumbers) + 1);
        }
        return NEW_NOTE_PREFIX + ' 1';
    }

    loadNotes() {
        axios.get('/notes').then(response => {
            this.setState({
                notes: response.data || []
            });
        });
    }

    componentDidMount() {
        this.loadNotes();
    }

    onNewNote = () => {
        const newId = this.state.notes.reduce((max, note) => note.id > max ? note.id : max, 0) + 1;
        const newNote = { id: newId, name: this.generateNewNoteName(), content: '' };
        this.setState({
            isProcessing: true,
            notes: [
                newNote,
                ...this.state.notes
            ]
        });
        axios.post('/notes/', newNote).finally(() => this.setState({ isProcessing: false }));
    };

    onNoteSelected = (note) => {
        this.setState({
            selectedNoteId: note.id
        });
    };

    onNoteDelete = (note) => {
        axios.delete('/notes/' + note.id).finally(() => this.loadNotes());
    };

    onNoteChanged = (note) => {
        const selectedNoteIndex = this.state.notes.findIndex(note => note.id === this.state.selectedNoteId);
        if (selectedNoteIndex >= 0) {
            const updatedNote = {
                ...this.state.notes[selectedNoteIndex],
                name: note.name,
                content: note.content
            };
            const newNotes = [...this.state.notes];
            newNotes.splice(selectedNoteIndex, 1, updatedNote);
            this.setState({
                notes: newNotes
            });
        }
    };

    render() {

        const selectedNote = this.state.notes.find(note => note.id === this.state.selectedNoteId);
        const noteEditor = selectedNote ?
            <NoteEditor note={selectedNote} onChange={this.onNoteChanged} /> : null;
        const spinner = this.state.isProcessing ? <i className="fa fa-spinner fa-spin" /> : null;

        return (
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                        <h1>Note App {spinner}</h1>
                        <button className={['btn', 'btn-primary', styles.ToolBtn].join(' ')} onClick={this.onNewNote}>New Note</button>
                    </div>
                    <Row>
                        <Col md={4} xl={3}>
                            <NoteList notes={this.state.notes}
                                      onNoteSelected={this.onNoteSelected}
                                      onNoteDelete={this.onNoteDelete} />
                        </Col>
                        <Col md={8} xl={9}>{noteEditor}</Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default NoteApp;