import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import LoadingModal from "./LoadingModal";
import RentalRequest from "../model/RentalRequest";

class ReservationSummary extends React.Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    this.state = {
      showModal: false,
      selectedCar: props.location.state.selectedCar,
      price: props.location.state.price,
      dateFrom: values[0].split("=")[1],
      dateTo: values[1].split("=")[1],
      locationIdFrom: values[2].split("=")[1],
      locationIdTo: values[3].split("=")[1],
      places: [],
      placesFetched: false
    };
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  sendReservation = () => {
    const showModal = this.handleShowModal;

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/api/add-rental", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("tokenObject", localStorage.getItem("token"));
    request.onload = function() {
      if (request.status === 200) {
        showModal();
      } else {
        alert("Nie posiadasz uprawnień do prowadzenia tego pojazdu!");
      }
    };

    // TODO() -> CHANGE CARINSTANCEID
    const rentalRequest = new RentalRequest(
      this.state.selectedCar.carInstanceId,
      localStorage.getItem("token"),
      this.state.locationIdFrom,
      this.state.locationIdTo,
      this.state.dateFrom,
      this.state.dateTo,
      this.state.price
    );
    request.send(JSON.stringify(rentalRequest));
  };

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces() {
    const changeState = places => {
      this.setState({ places: places, placesFetched: true });
    };
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/api/allcarrentalunits", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      const data = JSON.parse(this.response);
      if (request.status === 200) {
        changeState(data);
      } else {
        alert(data);
      }
    };
    request.send();
  }

  findStartLocation = elem => {
    return elem.carRentalUnitId === parseInt(this.state.locationIdFrom);
  };

  findEndLocation = elem => {
    return elem.carRentalUnitId === parseInt(this.state.locationIdTo);
  };

  render() {
    if (!this.state.placesFetched) {
      return <LoadingModal />;
    }

    const selectedCar = this.state.selectedCar.car;
    const startLocation = this.state.places.find(this.findStartLocation)
      .address;
    const endLocation = this.state.places.find(this.findEndLocation).address;

    const days =
      (new Date(this.state.dateTo).getTime() -
        new Date(this.state.dateFrom).getTime()) /
        (1000 * 3600 * 24) +
      1;
    return (
      <div className="CarDetails-body">
        <Container>
          <Row className="RowMust Center">
            <Col sm={12}>
              <h1>Podsumowanie</h1>
            </Col>
          </Row>
          <Row className="Row DetailsContent">
            <Col sm={5}>
              <img
                src={`https://car-rental-images.herokuapp.com/cars/${selectedCar.image}`}
                alt={selectedCar.model}
              />
            </Col>
            <Col sm={7}>
              <Row className="Row Center">
                <Col sm={12}>
                  <h1>
                    {selectedCar.brand} {selectedCar.model}
                  </h1>
                </Col>
              </Row>
              <Row className="Row Center">
                <Col sm={12}>
                  <h5>
                    Miejsce odbioru:{" "}
                    {` ${startLocation.city} ${startLocation.street} ${startLocation.buildingNumber}/${startLocation.houseNumber}`}
                    , {this.state.dateFrom}
                  </h5>
                </Col>
              </Row>
              <Row className="Row Center">
                <Col sm={12}>
                  <h5>
                    Miejsce zwrotu:{" "}
                    {` ${endLocation.city} ${endLocation.street} ${endLocation.buildingNumber}/${endLocation.houseNumber}`}
                    , {this.state.dateTo}
                  </h5>
                </Col>
              </Row>
              <Row className="Row Center">
                <Col sm={12}>
                  <h5>
                    {days} dni wypożyczenia, do zapłaty:{" "}
                    {days * this.state.price} zł
                  </h5>
                </Col>
              </Row>
              <Row className="Row CenterButton">
                <Col sm={12}>
                  <Button variant="primary" onClick={this.sendReservation}>
                    Zatwierdź
                  </Button>

                  <Modal show={this.state.showModal}>
                    <Modal.Header>
                      <Modal.Title>Zarezerwowano samochód</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Link to="/">
                        <Button
                          variant="primary"
                          onClick={this.handleCloseModal}
                        >
                          Ok
                        </Button>
                      </Link>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ReservationSummary;
