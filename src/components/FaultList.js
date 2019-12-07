import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import LoadingModal from "./LoadingModal";
import FaultReportButton from "./FaultReportButton";

class FaultList extends React.Component {
  state = {
    rentals: [],
    rentalsFetched: false
  };

  componentDidMount() {
    this.getRentals();
  }

  getRentals() {
    const changeState = results => {
      this.setState({ rentals: results, rentalsFetched: true });
    };
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/api/currentrentals", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("tokenObject", localStorage.getItem("token"));
    request.onload = function() {
      let data = JSON.parse(this.response);
      if (request.status === 200) {
        changeState(data);
      } else {
        alert(data);
      }
    };
    request.send();
  }

  render() {
    const rentalListJsx = [];
    for (let i = 0; i < this.state.rentals.length; i++) {
      const car = this.state.rentals[i].carInstance.car;
      const addressStart = this.state.rentals[i].carRentalUnitStart.address;
      const addressEnd = this.state.rentals[i].carRentalUnitEnd.address;

      rentalListJsx.push(
        <Row key={i} className="RentalListItem">
          <Col sm={3} className="d-flex align-items-center">
            <Image
              src={`https://car-rental-images.herokuapp.com/cars/${car.image}`}
              alt={car.model}
            />
          </Col>
          <Col sm={6}>
            <div className="ColumnWhole d-flex flex-column">
              <Row className="RowEnd d-flex align-item-start">
                <h6>
                  Początek:
                  {` ${addressStart.city} ${addressStart.street} ${addressStart.buildingNumber}/${addressStart.houseNumber}, ${this.state.rentals[i].dateFrom}`}
                </h6>
              </Row>
              <Row className="RowMust CarListName d-flex align-items-center flex-grow-1">
                <Col sm={12}>
                  <h2>
                    {car.brand} {car.model}
                  </h2>
                </Col>
              </Row>
              <Row className="RowEnd d-flex align-items-end">
                <h6>
                  Koniec:
                  {` ${addressEnd.city} ${addressEnd.street} ${addressEnd.buildingNumber}/${addressEnd.houseNumber}, ${this.state.rentals[i].dateTo}`}
                </h6>
              </Row>
            </div>
          </Col>
          <Col
            sm={3}
            className="d-flex justify-content-center align-items-center"
          >
            <FaultReportButton rentalId={this.state.rentals[i].hireId} />
          </Col>
        </Row>
      );
    }

    if (!this.state.rentalsFetched) {
      return <LoadingModal />;
    }

    return (
      <div className="Rentals-body">
        <Container>
          <Row className="RowMust Center" style={{ margin: "10px" }}>
            <Col sm={12}>
              <h1>
                {this.state.rentals.length > 0
                  ? "Aktualne wypożyczenia"
                  : "Nie wypożyczono żadnego samochodu!"}
              </h1>
            </Col>
          </Row>
          <Row className="Row CarList d-flex justify-content-center">
            {rentalListJsx}
          </Row>
        </Container>
      </div>
    );
  }
}

export default FaultList;
