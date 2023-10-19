import React, { useState } from "react";
import Select from "react-select";
import { Modal, ModalBody, ModalDialog, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const CustomModal = (props) => {
  const { options, name, profile, setProfile, setModalOpen } = props;
  const [data, setData] = useState(profile[name]);
  const handleSave = () => {
    setProfile({ ...profile, [name]: data });
    setModalOpen(false);
  };
  return (
    <Modal show={true} centered size="lg">
      <ModalHeader style={{ backgroundColor: "#1d3557", color: "#fff" }}>
        <h5 class="modal-title">Set preferences</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          onClick={() => setModalOpen(false)}
          style={{ backgroundColor: "#fff" }}
        ></button>
      </ModalHeader>
      <ModalBody>
        <Select
          defaultValue={profile[name]}
          isSearchable
          isClearable
          isMulti
          options={options}
          onChange={(ele) => setData(ele)}
        />
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="custom-btn px-3 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
