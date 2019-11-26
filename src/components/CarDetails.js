import React, { Component } from "react";
import "../Main.css";
import { Container, Row, Col } from "react-bootstrap";
import ReservationButton from "./ReservationButton";
import passengersIcon from "../images/passenger.svg";
import powerIcon from "../images/power.svg";
import gearboxIcon from "../images/gearbox.svg";
import airConditioningIcon from "../images/airconditioner.svg";
import gpsIcon from "../images/gps.svg";
import icon4x4 from "../images/4x4.svg";

class CarDetails extends Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    const dateFrom = new Date(values[0].split("=")[1]);

    this.state = {
      selectedCar: props.location.state.selectedCar,
      dateFrom: dateFrom,
      dateTo: new Date(values[1].split("=")[1]),
      locationIdFrom: values[2].split("=")[1],
      prices: [
        {
          city: "Wrocław, Bardzka 54/76",
          cityValue: "6",
          price: 105
        },
        {
          city: "Wrocław, Graniczna 32/87",
          cityValue: "7",
          price: 115
        },
        {
          city: "Wrocław, Krzywoustego 23/16",
          cityValue: "5",
          price: 130
        },
        {
          city: "Kłodzko, Szafowa 15/3",
          cityValue: "2",
          price: 110
        },
        {
          city: "Legnica, Potockiego 10/15",
          cityValue: "3",
          price: 180
        },
        {
          city: "Lubin, Parkowa 75/1",
          cityValue: "4",
          price: 135
        },
        {
          city: "Wałbrzych, Górska 2/1",
          cityValue: "1",
          price: 195
        }
      ]
    };
  }

  render() {
    const { selectedCar } = this.state;

    const endCitiesJsx = [];
    for (let i = 0; i < this.state.prices.length; i++) {
      const price = this.state.prices[i];
      endCitiesJsx.push(
        <Col sm={12} key={i}>
          <Row className="Row Center d-flex align-items-center">
            <Col sm={3} />
            <Col sm={3}>
              {price.city}: {price.price} zł
            </Col>
            <Col sm={2}>
              <ReservationButton
                selectedCar={selectedCar}
                dateFrom={this.state.dateFrom}
                dateTo={this.state.dateTo}
                locationIdFrom={this.state.locationIdFrom}
                locationIdTo={price.cityValue}
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
              <h1>
                {selectedCar.brand} {selectedCar.model}
              </h1>
            </Col>
          </Row>
          <Row className="Row DetailsContent d-flex align-items-center justify-items-center">
            <Col sm={5}>
              <img
                src={`https://car-rental-images.herokuapp.com/cars/${selectedCar.image}`}
                alt={selectedCar.model}
              />
            </Col>
            <Col sm={7}>
              <Row>
                <Col sm={6}>
                  <div>
                    <img
                      className="Icon"
                      src={passengersIcon}
                      alt="Passengers icon"
                    />
                    <span className="IconDesc">
                      {selectedCar.passengers} pasażerów
                    </span>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <img className="Icon" src={powerIcon} alt="Power icon" />
                    <span className="IconDesc">
                      {selectedCar.horsePower} KM
                    </span>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <img
                      className="Icon"
                      src={gearboxIcon}
                      alt="Gearbox icon"
                    />
                    <span className="IconDesc">
                      {selectedCar.gearBox === "Automatic"
                        ? "Automat."
                        : "Ręczna"}{" "}
                      skrz. bieg.
                    </span>
                  </div>
                </Col>
                <Col sm={6}>
                  {selectedCar.airConditioning && (
                    <div>
                      <img
                        className="Icon"
                        src={airConditioningIcon}
                        alt="Air conditioning icon"
                      />
                      <span className="IconDesc">Klimatyzacja</span>
                    </div>
                  )}
                </Col>
                <Col sm={6}>
                  {selectedCar.gps && (
                    <div>
                      <img
                        className="Icon"
                        src={gpsIcon}
                        alt="Navigation icon"
                      />
                      <span className="IconDesc">Nawigacja</span>
                    </div>
                  )}
                </Col>
                <Col sm={6}>
                  {selectedCar.is4x4 && (
                    <div>
                      <img className="Icon" src={icon4x4} alt="4x4 icon" />
                      <span className="IconDesc">Napęd 4x4</span>
                    </div>
                  )}
                </Col>
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
