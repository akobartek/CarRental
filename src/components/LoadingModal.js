import React from "react";
import { Modal, Spinner } from "react-bootstrap";

class LoadingModal extends React.Component {
  render() {
    return (
      <Modal.Dialog size="sm">
        <Modal.Body className="Center">
          <Spinner animation="border" role="status">
            <span className="sr-only Center">Ładowanie...</span>
          </Spinner>
          <h4 className="Center">Ładowanie...</h4>
        </Modal.Body>
      </Modal.Dialog>
    );
  }
}

export default LoadingModal;
