import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const CustomProfileModal = (props) => {
  const { profile, setProfile, setModalOpen } = props;
  const [data, setData] = useState(profile);
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (data.name == "") {
      setError(true);
    } else {
      setProfile({ ...profile, ...data });
      console.log(data);
      setModalOpen(false);
    }
  };

  return (
    <Modal show={true} centered>
      <ModalHeader>
        <h5 class="modal-title">Edit Details</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          onClick={() => setModalOpen(false)}
        ></button>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            {error && (
              <span style={{ color: "red", fontSize: 12 }}>
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>University</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter university"
              value={data.university}
              onChange={(e) => setData({ ...data, university: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact"
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
            />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomProfileModal;
