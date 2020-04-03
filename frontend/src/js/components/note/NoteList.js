import React, {Component} from "react";
import { ListGroup } from "react-bootstrap";
import styles from './NoteList.css';

class NoteList extends Component {

    constructor(props) {
        super(props);
    }

    noteClicked = (note) => {
        this.props.onNoteSelected(note);
    };

    render() {

        const noteComponents = this.props.notes.map(note => {
            return (
                <ListGroup.Item as="div" key={note.id} action onClick={() => this.noteClicked(note)}>
                    <div className="d-flex justify-content-between">
                        <span className={[styles.NoteName].join(' ')}>{note.name}</span>
                        <button className="btn btn-light btn-sm"><i className="fa fa-trash" /></button>
                    </div>
                </ListGroup.Item>
            );
        });

        return (
            <ListGroup>{noteComponents}</ListGroup>
        );
    }
}

export default NoteList;