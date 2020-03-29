import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import NoteList from './note/NoteList';
import NoteEditor from './note/NoteEditor';

class NoteApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                { id: 1, name: 'Note 1', content: 'Labore neque sit adipisci quisquam eius magnam non aliquam dolore ut consectetur non ipsum consectetur consectetur. Eius quaerat modi consectetur dolorem sed quiquia aliquam sit est dolorem labore adipisci dolor ut dolore adipisci ipsum non. Labore dolore voluptatem dolor.'},
                { id: 2, name: 'Note 2', content: 'Labore neque sit adipisci quisquam eius magnam non aliquam dolore ut consectetur non ipsum consectetur consectetur. Eius quaerat modi consectetur dolorem sed quiquia aliquam sit est dolorem labore adipisci dolor ut dolore adipisci ipsum non. Labore dolore voluptatem dolor.'},
                { id: 3, name: 'Note 3', content: 'Labore neque sit adipisci quisquam eius magnam non aliquam dolore ut consectetur non ipsum consectetur consectetur. Eius quaerat modi consectetur dolorem sed quiquia aliquam sit est dolorem labore adipisci dolor ut dolore adipisci ipsum non. Labore dolore voluptatem dolor.'}
            ],
            selectedNoteId: null
        };
    }

    onNoteSelected = (note) => {
        this.setState({
            selectedNoteId: note.id
        });
    };

    onNoteChanged = (text) => {
        const selectedNoteIndex = this.state.notes.findIndex(note => note.id === this.state.selectedNoteId);
        if (selectedNoteIndex >= 0) {
            const updatedNote = {
                ...this.state.notes[selectedNoteIndex],
                content: text
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
        const noteEditor = selectedNote ? <NoteEditor text={selectedNote.content} onChange={this.onNoteChanged} /> : null;

        return (
            <Row>
                <Col>
                    <h1>Note App</h1>
                    <Row>
                        <Col md={4} xl={3}>
                            <NoteList notes={this.state.notes} onNoteSelected={this.onNoteSelected} />
                        </Col>
                        <Col md={8} xl={9}>{noteEditor}</Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default NoteApp;