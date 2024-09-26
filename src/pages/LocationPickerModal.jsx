import React from 'react';
import { Modal } from 'react-bootstrap';
import Map from './Map';
import './custom.css'; 


const LocationPickerModal = ({ show, onHide, onLocationSelect }) => {
  return (
    <enter>
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Current Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Map onLocationSelect={onLocationSelect} />
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          CLOSE
        </button>
      </Modal.Footer>
    </Modal>
    </enter>
  );
};

export default LocationPickerModal;
