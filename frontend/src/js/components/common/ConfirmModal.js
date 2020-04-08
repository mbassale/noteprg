import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title || 'Confirm'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.props.message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onCancel}>{this.props.noTitle || 'No'}</Button>
                    <Button variant="primary" onClick={this.props.onConfirm}>{this.props.yesTitle || 'Yes'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ConfirmModal;