import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import LoadingModal from "./LoadingModal";

class MyRentals extends React.Component {
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
    request.open("POST", "http://localhost:8080/api/rentals", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("tokenObject", localStorage.getItem("token"));
    request.onload = function() {
      let data = JSON.parse(this.response);
      if (request.status === 200) {
        console.log(data);
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
          <Col sm={12}>
            <Row className="Row Center">
              <Col sm={4} style={{ marginBottom: "10px" }}>
                Zapłacono: {this.state.rentals[i].costPerDay}zł/dzień
              </Col>
              <Col sm={4} />
              <Col sm={4}>
                <Link to={`/getReports/${this.state.rentals[i].hireId}`}>
                  <Button variant="outline-dark">Historia usterek</Button>
                </Link>
              </Col>
            </Row>
            <Row className="Row">
              <Col sm={4} className="d-flex align-items-center">
                <Image
                  src={`https://car-rental-images.herokuapp.com/cars/${car.image}`}
                  alt={car.model}
                />
              </Col>
              <Col sm={8}>
                <div className="ColumnWhole d-flex flex-column">
                  <Row className="RowEnd d-flex align-item-start justify-content-end">
                    <h5>
                      Początek:
                      {` ${addressStart.city} ${addressStart.street} ${addressStart.buildingNumber}/${addressStart.houseNumber}, ${this.state.rentals[i].dateFrom}`}
                    </h5>
                  </Row>
                  <Row className="RowMust CarListName d-flex align-items-center flex-grow-1">
                    <Col sm={12}>
                      <h2>
                        {car.brand} {car.model}
                      </h2>
                    </Col>
                  </Row>
                  <Row className="RowEnd d-flex align-items-end justify-content-end">
                    <h5>
                      Koniec:
                      {` ${addressEnd.city} ${addressEnd.street} ${addressEnd.buildingNumber}/${addressEnd.houseNumber}, ${this.state.rentals[i].dateTo}`}
                    </h5>
                  </Row>
                </div>
              </Col>
            </Row>
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
                Historia wypożyczeń
                {this.state.rentals.length > 0 ? "" : " jest pusta!"}
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

export default MyRentals;
