import React from 'react';
import {Modal} from 'react-bootstrap';


const ModalComponent = (props) => {
    return (
        <Modal show={props.show}
               onHide={props.hide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    )
};

export default ModalComponent;