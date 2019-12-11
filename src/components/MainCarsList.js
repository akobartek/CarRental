import React from "react";
import { Link } from "react-router-dom";
import "../Main.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import LoadingModal from "./LoadingModal";
import DeleteCarRequest from "../model/DeleteCarRequest";

class MainCarList extends React.Component {
  state = {
    results: [],
    resultsFetched: false,
    showModal: false
  };

  handleShowModal = carInstanceId => {
    this.setState({ showModal: true, carToDeleteId: carInstanceId });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false, carToDeleteId: null });
  };

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    const changeState = results => {
      this.setState({ results: results, resultsFetched: true });
    };
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/api/allcarinstances", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("tokenObject", localStorage.getItem("token"));
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

  deleteCar = () => {
    const closeModal = this.handleCloseModal;
    const carInstanceId = this.state.carToDeleteId;
    const changeState = () => {
      closeModal();
      this.setState({
        results: this.state.results.map(
          obj => obj.carInstanceId !== carInstanceId
        ),
        resultsFetched: true
      });
    };

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/api/delete-car", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("tokenObject", localStorage.getItem("token"));
    request.onload = function() {
      if (request.status === 200) {
        changeState();
      } else {
        closeModal();
      }
    };
    const deleteCarRequest = new DeleteCarRequest(carInstanceId);
    request.send(JSON.stringify(deleteCarRequest));
  };

  render() {
    const resultListJsx = [];
    for (let i = 0; i < this.state.results.length; i++) {
      const result = this.state.results[i];
      resultListJsx.push(
        <Col sm={5} key={i} className="CarListItem">
          <Row>
            <Col sm={12}>
              <Row className="RowMust CarListName">
                <Col sm={12}>
                  <h4>
                    {result.car.brand} {result.car.model}
                  </h4>
                </Col>
              </Row>
              <Row className="Row CarListInfo d-flex align-items-center">
                <Col sm={6}>
                  <img
                    src={`https://car-rental-images.herokuapp.com/cars/${result.car.image}`}
                    alt={result.car.model}
                  />
                </Col>
                <Col sm={5}>
                  <Row className="Row">
                    <Col>
                      <h5 style={{ marginBottom: "0px" }}>Rejestracja:</h5>
                      {result.registrationNumber}
                    </Col>
                  </Row>
                  <Row className="Row">
                    <Col>
                      <h5 style={{ marginBottom: "0px" }}>Numer VIN:</h5>
                      {result.vin}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="Row">
                <Col sm={12} className="CenterButton">
                  <Button
                    variant="outline-danger"
                    onClick={() => this.handleShowModal(result.carInstanceId)}
                  >
                    Usuń samochód
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      );
    }

    if (!this.state.resultsFetched) {
      return <LoadingModal />;
    }

    return (
      <div className="SearchResult-body">
        <Container>
          <Row className="Title">
            <Col sm={12}>
              <Link to="/addCar">
                <Button variant="primary" onClick={this.handleCloseModal}>
                  Dodaj nowy samochód
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="Row CarList d-flex justify-content-center">
            {resultListJsx}
          </Row>

          <Modal show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title>
                Czy na pewno chcesz usunąć ten samochód?
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="outline-primary" onClick={this.handleCloseModal}>
                Cofnij
              </Button>
              <Button variant="danger" onClick={this.deleteCar}>
                Tak
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default MainCarList;
