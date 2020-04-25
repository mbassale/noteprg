import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadCurrentUser, loadNotes, addNote, selectNote, deleteNote, updateNote } from '../actions';
import { Col, Row } from 'react-bootstrap';
import NoteList from './note/NoteList';
import NoteEditor from './note/NoteEditor';
import ConfirmModal from './common/ConfirmModal';
import styles from './NoteApp.css';

const NEW_NOTE_PREFIX = 'New Note';

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        user: state.user,
        notes: state.notes,
        selectedNoteId: state.selectedNoteId
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadCurrentUser: () => dispatch(loadCurrentUser()),
        loadNotes: () => dispatch(loadNotes()),
        selectNote: note => dispatch(selectNote(note)),
        addNote: note => dispatch(addNote(note)),
        updateNote: note => dispatch(updateNote(note)),
        deleteNote: note => dispatch(deleteNote(note))
    };
}

class NoteApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isProcessing: false,
            isSaved: false,
            showDeleteConfirm: false,
            deletingNote: null
        };
    }

    componentDidMount() {
        this.setState({ isProcessing: true });
        this.props.loadCurrentUser().then(() => {
            return this.props.loadNotes().finally(() => this.setState({ isProcessing: false }));
        });
    }

    generateNewNoteName() {
        const noteNumbers = this.props.notes.map(note => {
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

    onNewNote = () => {
        const newId = this.props.notes.reduce((max, note) => note.id > max ? note.id : max, 0) + 1;
        const newNote = { id: newId, user: this.props.user.id, name: this.generateNewNoteName(), content: 'New Note' };
        this.props.addNote(newNote).finally(() => this.setState({ isProcessing: false }));
    };

    onNoteSelected = (note) => {
        this.props.selectNote(note);
    };

    onNoteDelete = (note) => {
        this.setState({
            showDeleteConfirm: true,
            deletingNote: note
        });
    };

    onConfirmDelete = () => {
        this.setState({ isProcessing: true });
        this.props.deleteNote(this.state.deletingNote).finally(() => {
            this.setState({
                showDeleteConfirm: null,
                deletingNote: null
            });
            this.props.loadNotes().finally(() => this.setState({ isProcessing: false }));
        });
    };

    onCancelDelete = () => {
        this.setState({
            showDeleteConfirm: false,
            deletingNote: null
        });
    };

    onNoteChanged = (note) => {
        const selectedNoteIndex = this.props.notes.findIndex(note => note.id === this.props.selectedNoteId);
        if (selectedNoteIndex >= 0) {
            const updatedNote = {
                ...this.props.notes[selectedNoteIndex],
                name: note.name,
                content: note.content
            };
            this.props.updateNote(updatedNote).finally(() => {
                this.setState({ isSaved: true });
                setTimeout(() => this.setState({ isSaved: false }), 1000);
            });
        }
    };

    render() {

        const selectedNote = this.props.notes.find(note => note.id === this.props.selectedNoteId);
        const noteEditor = selectedNote ?
            <NoteEditor note={selectedNote} onChange={this.onNoteChanged} /> : null;
        const spinner = this.state.isProcessing ? <i className="fa fa-spinner fa-spin" /> : null;
        const savedIndicator = this.state.isSaved ?
            <p className="form-control-static mr-2 text-muted"><i className="fa fa-save fa-lg mt-3" /> Saving&hellip;</p> : null;
        const confirmDeleteModal = <ConfirmModal title="Confirm Deletion" message="Are you sure to delete this note?"
                                                 yesTitle="Delete" noTitle="Cancel"
                                                 show={this.state.showDeleteConfirm}
                                                 onConfirm={this.onConfirmDelete}
                                                 onCancel={this.onCancelDelete} />;

        return (
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                        <h1>Note App {spinner}</h1>
                        <div className="d-flex justify-content-end">
                            {savedIndicator}
                            <button className={['btn', 'btn-primary', styles.ToolBtn].join(' ')} onClick={this.onNewNote}>New Note</button>
                        </div>
                    </div>
                    <Row>
                        <Col md={4} xl={3}>
                            <NoteList notes={this.props.notes}
                                      onNoteSelected={this.onNoteSelected}
                                      onNoteDelete={this.onNoteDelete} />
                        </Col>
                        <Col md={8} xl={9}>{noteEditor}</Col>
                    </Row>
                    {confirmDeleteModal}
                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteApp);