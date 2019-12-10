import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

class ReservationButton extends React.Component {
  state = {
    showModal: false
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const {
      selectedCar,
      dateFrom,
      dateTo,
      locationIdFrom,
      locationIdTo,
      price
    } = this.props;

    console.log(price);

    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
      return (
        <Link
          to={{
            pathname: "/reservation",
            search:
              `?dateFrom=${dateFrom.toISOString().substring(0, 10)}` +
              `&dateTo=${dateTo.toISOString().substring(0, 10)}` +
              `&locationIdFrom=${locationIdFrom}` +
              `&locationIdTo=${locationIdTo}`,
            state: {
              selectedCar: selectedCar,
              price: price
            }
          }}
        >
          <Button variant="light">Rezerwuj</Button>
        </Link>
      );
    } else {
      return (
        <>
          <Modal show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title>Wymagane logowanie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Aby dokonać rezerwacji należy być zalogowanym!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={this.handleCloseModal}>
                Cofnij
              </Button>
              <Link to="/signin">
                <Button variant="primary" onClick={this.handleCloseModal}>
                  Logowanie
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
          <Button variant="light" onClick={this.handleShowModal}>
            Rezerwuj
          </Button>
        </>
      );
    }
  }
}

export default ReservationButton;
