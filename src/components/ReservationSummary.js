import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import LoadingModal from "./LoadingModal";

class ReservationSummary extends React.Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    this.state = {
      showModal: false,
      selectedCar: props.location.state.selectedCar,
      dateFrom: values[0].split("=")[1],
      dateTo: values[1].split("=")[1],
      locationIdFrom: values[2].split("=")[1],
      locationIdTo: values[3].split("=")[1],
      places: [],
      placesFetched: false
    };
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleShowModal = () => {
    this.setState({ showModal: true });
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

    const { selectedCar } = this.state;
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
                    {days} dni wypożyczenia, do zapłaty: {days * 115} zł
                  </h5>
                </Col>
              </Row>
              <Row className="Row CenterButton">
                <Col sm={12}>
                  <Button variant="primary" onClick={this.handleShowModal}>
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
