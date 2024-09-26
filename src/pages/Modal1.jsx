import React from 'react'
import { Modal } from 'react-bootstrap';
import './custom.css'; 

const Modal1 = ({ show, onHide }) => {
  return (
    <enter>
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Request Sent </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       Rescue Agencies will reach your location soon .. 
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          CLOSE
        </button>
      </Modal.Footer>
    </Modal>
    </enter>
  )
}

export default Modal1


