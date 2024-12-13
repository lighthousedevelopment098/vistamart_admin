import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const StatusUpdateModal = ({ show, onHide, onConfirm }) => {
  const [status, setStatus] = React.useState('confirmed');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(status);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="confirmed">Confirmed</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
              <option value="extra">Extra</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StatusUpdateModal;
