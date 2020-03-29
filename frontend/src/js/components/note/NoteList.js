import React, {Component} from "react";
import { ListGroup } from "react-bootstrap";

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
                <ListGroup.Item key={note.id} action onClick={() => this.noteClicked(note)}>{note.name}</ListGroup.Item>
            );
        });

        return (
            <ListGroup>{noteComponents}</ListGroup>
        );
    }
}

export default NoteList;