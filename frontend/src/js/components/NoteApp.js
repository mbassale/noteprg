import React, { Component } from 'react';

class NoteApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };
    }

    render() {
        return (
            <h1>Note App</h1>
        );
    }
}

export default NoteApp;