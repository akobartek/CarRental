import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class SendReportButton extends React.Component {
  state = {
    show: false
  };

  showModal = () => {
    this.setState({ show: true });
  };

  render() {
    //this.props.state -> SEND TO API
    return (
      <>
        <Button variant="primary" onClick={this.showModal}>
          Zgłoś usterkę
        </Button>
        <Modal show={this.state.show} centered>
          <Modal.Header>
            <Modal.Title>Zgłoszono usterkę!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant="outline-primary"
              onClick={this.props.history.goBack}
            >
              Powrót
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(SendReportButton);
