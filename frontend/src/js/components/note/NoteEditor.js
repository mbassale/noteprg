import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';

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

    render() {
        return (
            <ReactMde
                value={this.props.text}
                selectedTab={this.state.selectedTab}
                onChange={this.props.onChange}
                onTabChange={this.onTabChange}
                minEditorHeight="500px"
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
        );
    }
}

export default NoteEditor;