import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class CancelReportButton extends React.Component {
  state = {
    show: false
  };

  showModal = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <Button variant="outline-danger" onClick={this.showModal}>
          Anuluj zgłoszenie
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header>
            <Modal.Title>Anulowanie zgłoszenia</Modal.Title>
          </Modal.Header>
          <Modal.Body>Czy na pewno chcesz anulować zgłoszenie?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Powrót
            </Button>
            <Button variant="danger" onClick={this.props.history.goBack}>
              Anuluj
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(CancelReportButton);
