import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ReportRequest from "../model/ReportRequest";
import axios from "axios";

class SendReportButton extends React.Component {
  state = {
    showEndReport: false,
    showLoadingModal: false,
    isSuccessful: false
  };

  handleShowSuccessModal = () => {
    this.setState({ showEndReport: true, isSuccessful: true });
  };

  handleShowFailModal = () => {
    this.setState({ showEndReport: true, isSuccessful: false });
  };

  sendReport = () => {
    const { optionValues, files } = this.props.state;
    const { rentalId } = this.props;
    const showSuccessModal = this.handleShowSuccessModal;
    const showFailModal = this.handleShowFailModal;

    const data = new FormData();
    data.append("file", files[0]);
    axios
      .post("https://car-rental-images.herokuapp.com/reports/", data, {})
      .then(res => {
        if (res.data.status === "success") {
          const request = new XMLHttpRequest();
          request.open("POST", "http://localhost:8080/api/add-damage", true);
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader(
            "tokenObject",
            localStorage.getItem("token")
          );
          request.onload = function() {
            if (request.status === 200) {
              showSuccessModal();
            } else {
              showFailModal();
            }
          };
          const loginRequest = new ReportRequest(
            rentalId,
            optionValues[0][0] === 0 ? "Tak" : "Nie",
            optionValues[0][1] === 0 ? "Tak" : "Nie",
            optionValues[0][2] === 0 ? "Tak" : "Nie",
            optionValues[0][3] === 0 ? "Tak" : "Nie",
            optionValues[0][4] === 0 ? "Tak" : "Nie",
            document.getElementById("TextArea1").value,
            optionValues[1][0] === 0 ? "Tak" : "Nie",
            optionValues[1][1] === 0 ? "Tak" : "Nie",
            optionValues[1][2] === 0 ? "Tak" : "Nie",
            optionValues[1][3] === 0 ? "Tak" : "Nie",
            optionValues[1][4] === 0 ? "Tak" : "Nie",
            document.getElementById("TextArea2").value,
            res.data.fileName
          );
          request.send(JSON.stringify(loginRequest));
        } else {
          showFailModal();
        }
      });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.sendReport}>
          Zgłoś usterkę
        </Button>
        <Modal show={this.state.showEndReport} centered>
          <Modal.Header>
            <Modal.Title>
              {this.state.isSuccessful
                ? "Zgłoszono usterkę!"
                : "Wystąpił błąd, spróbuj wysłać raport ponownie!"}
            </Modal.Title>
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
