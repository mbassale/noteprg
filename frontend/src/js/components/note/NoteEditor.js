import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import {Col, FormGroup} from "react-bootstrap";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

class NoteEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'write'
        };
    }

    onTabChange = (tab) => {
        this.setState({
            selectedTab: tab
        });
    };

    onChangeName = (event) => {
        const updatedNote = {
            ...this.props.note,
            name: event.target.value
        };
        this.props.onChange(updatedNote);
    };

    onChangeContent = (text) => {
        const updatedNote = {
            ...this.props.note,
            content: text
        };
        this.props.onChange(updatedNote);
    };

    render() {
        return (
            <div className="d-flex flex-column justify-content-start">
                <div className="d-flex justify-content-between mb-2">
                    <input type="text" className="form-control" placeholder="Note Title"
                           value={this.props.note.name} onChange={this.onChangeName} />
                </div>
                <ReactMde
                    value={this.props.note.content}
                    selectedTab={this.state.selectedTab}
                    onChange={this.onChangeContent}
                    onTabChange={this.onTabChange}
                    minEditorHeight="500px"
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                />
            </div>
        );
    }
}

export default NoteEditor;