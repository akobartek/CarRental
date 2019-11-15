import React, { Component } from "react";
import "../Main.css";
import { Container, Row, Col } from "react-bootstrap";
import ReservationButton from "./ReservationButton";

class CarDetails extends Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    const startDate = new Date(values[1].split("=")[1]);

    this.state = {
      carId: values[0].split("=")[1],
      startDate: startDate,
      endDate: new Date(values[2].split("=")[1]),
      startCity: values[3].split("=")[1],
      prices: [
        {
          city: "Wrocław",
          cityValue: "Wroclaw",
          price: 105
        },
        {
          city: "Legnica",
          cityValue: "Legnica",
          price: 115
        },
        {
          city: "Głogów",
          cityValue: "Glogow",
          price: 130
        },
        {
          city: "Jelenia Góra",
          cityValue: "JeleniaGora",
          price: 110
        }
      ]
    };
  }

  render() {
    const endCitiesJsx = [];
    for (let i = 0; i < this.state.prices.length; i++) {
      const price = this.state.prices[i];
      endCitiesJsx.push(
        <Col sm={12}>
          <Row className="Row Center d-flex align-items-center">
            <Col sm={4} />
            <Col sm={2}>
              {price.city}: {price.price} zł
            </Col>
            <Col sm={2}>
              <ReservationButton
                carId={this.state.carId}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                startCity={this.state.startCity}
                endCity={price.cityValue}
              />
            </Col>
            <Col sm={4} />
          </Row>
        </Col>
      );
    }

    return (
      <div className="CarDetails-body">
        <Container>
          <Row className="RowMust Center">
            <Col sm={12}>
              <h1>Porsche 911</h1>
            </Col>
          </Row>
          <Row className="Row DetailsContent d-flex align-items-center">
            <Col sm={5}>
              <img
                src="https://purepng.com/public/uploads/large/purepng.com-red-porsche-911-gt3-rs-4-carcarvehicletransportporsche-961524661235vbivb.png"
                alt="xD"
              />
            </Col>
            <Col sm={7}>
              <Row className="Center">
                <Col sm={6}>Ikonka</Col>
                <Col sm={6}>Ikonka</Col>
                <Col sm={6}>Ikonka</Col>
                <Col sm={6}>Ikonka</Col>
                <Col sm={6}>Ikonka</Col>
                <Col sm={6}>Ikonka</Col>
                <Col sm={6}>Ikonka</Col>
                <Col sm={6}>Ikonka</Col>
              </Row>
            </Col>
          </Row>
          <Row className="RowMust Center DetailsContent d-flex justify-content-center">
            Cena za dobę przy oddaniu samochodu w punkcie:
          </Row>
          <Row className="Row PricesList d-flex justify-content-center">
            {endCitiesJsx}
          </Row>
        </Container>
      </div>
    );
  }
}

export default CarDetails;
