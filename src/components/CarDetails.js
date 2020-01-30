import React, { Component } from "react";
import "../Main.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import ReservationButton from "./ReservationButton";
import LoadingModal from "./LoadingModal";
import passengersIcon from "../images/passenger.svg";
import powerIcon from "../images/power.svg";
import gearboxIcon from "../images/gearbox.svg";
import airConditioningIcon from "../images/airconditioner.svg";
import gpsIcon from "../images/gps.svg";
import icon4x4 from "../images/4x4.svg";

// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

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
      prices: [],
      weather: [],
      weatherFetched: false,
      pricesFetched: false,
      allFetched: false
    };
  }

  componentDidMount() {
    this.getPrices();
    this.getWeather();
  }

  getPrices() {
    const changeState = prices => {
      console.log("Prices fetched");
      if (this.state.weatherFetched)
        this.setState({
          prices: prices,
          pricesFetched: true,
          allFetched: true
        });
      else
        this.setState({
          prices: prices,
          pricesFetched: true
        });
    };
    const selectedCar = this.state.selectedCar;

    const request = new XMLHttpRequest();
    request.open(
      "GET",
      `http://localhost:8080/api/pricesforsearch?${
        window.location.href.split("?")[1]
      }`,
      true
    );
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      const data = JSON.parse(this.response);
      if (request.status === 200) {
        const carRentalObjects = data.find(
          obj => obj.first.carInstanceId === selectedCar.carInstanceId
        ).second;
        changeState(
          Object.entries(carRentalObjects)
            .map(obj => [
              JSON.parse(
                obj[0]
                  .replace("CarRentalUnit", "")
                  .replace("Address", "")
                  .replace("carRentalUnitId", '"carRentalUnitId"')
                  .replace(
                    "optimalQuantityCityCars",
                    '"optimalQuantityCityCars"'
                  )
                  .replace(
                    "optimalQuantityOffroadCars",
                    '"optimalQuantityOffroadCars"'
                  )
                  .replace(
                    "optimalQuantityDeliveryCars",
                    '"optimalQuantityDeliveryCars"'
                  )
                  .replace("address", '"address"')
                  .replace("addressId", '"addressId"')
                  .replace("buildingNumber", '"buildingNumber"')
                  .replace("city", '"city"')
                  .replace("country", '"country"')
                  .replace("houseNumber", '"houseNumber"')
                  .replace("street", '"street"')
                  .replaceAll("=", ":")
                  .replaceAll("'", '"')
              ),
              obj[1]
            ])
            .sort((elem1, elem2) => {
              if (elem1[0].address.city > elem2[0].address.city) return 1;
              else if (elem1[0].address.city < elem2[0].address.city) return -1;
              else if (elem1[0].address.street > elem2[0].address.street)
                return 1;
              else if (elem1[0].address.street < elem2[0].address.street)
                return -1;
              else if (
                elem1[0].address.buildingNumber >
                elem2[0].address.buildingNumber
              )
                return 1;
              else if (
                elem1[0].address.buildingNumber <
                elem2[0].address.buildingNumber
              )
                return -1;
              else return 0;
            })
        );
      } else {
        alert(data);
      }
    };

    request.send();
  }

  getWeather() {
    const changeState = weather => {
      console.log("Weather fetched");
      if (this.state.pricesFetched)
        this.setState({
          weather: weather,
          weatherFetched: true,
          allFetched: true
        });
      else
        this.setState({
          weather: weather,
          weatherFetched: true
        });
    };

    let city = "";
    switch (parseInt(this.state.locationIdFrom)) {
      case 1:
        city = "Walbrzych";
        break;
      case 2:
        city = "Klodzko";
        break;
      case 3:
        city = "Legnica";
        break;
      case 4:
        city = "Lubin";
        break;
      case 5:
      case 6:
      case 7:
        city = "Wroclaw";
        break;
      default:
        city = "";
    }

    const request = new XMLHttpRequest();
    request.open(
      "GET",
      `https://car-rental-weather.herokuapp.com/forecast?city=${city}`,
      true
    );
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      const data = JSON.parse(this.response);
      if (request.status === 200) {
        changeState(data.list);
      } else {
        alert(data);
      }
    };
    request.send();
  }

  render() {
    if (!this.state.allFetched) {
      return <LoadingModal />;
    }

    const selectedCar = this.state.selectedCar.car;
    const endCitiesJsx = [];
    for (let i = 0; i < this.state.prices.length; i++) {
      const price = this.state.prices[i];
      endCitiesJsx.push(
        <Col sm={12} key={i}>
          <Row className="Row Center d-flex align-items-center">
            <Col sm={1} />
            <Col sm={7}>
              {`${price[0].address.city}, ${price[0].address.street} ${price[0].address.buildingNumber}/${price[0].address.houseNumber}`}
              : <b>{price[1]}zł</b>
            </Col>
            <Col sm={2}>
              <ReservationButton
                selectedCar={this.state.selectedCar}
                dateFrom={this.state.dateFrom}
                dateTo={this.state.dateTo}
                locationIdFrom={this.state.locationIdFrom}
                locationIdTo={price[0].carRentalUnitId}
                price={price[1]}
              />
            </Col>
            <Col sm={2} />
          </Row>
        </Col>
      );
    }

    const weatherListJsx = [];
    let lastDate = "";
    for (let i = 0; i < this.state.weather.length; i++) {
      const weather = this.state.weather[i];
      let isDateChanged = false;

      if (
        weather.date.includes("T09:00") ||
        weather.date.includes("T12:00") ||
        weather.date.includes("T18:00")
      ) {
        if (lastDate !== weather.date.substring(0, 10)) {
          lastDate = weather.date.substring(0, 10);
          isDateChanged = true;
        }

        weatherListJsx.push(
          <Row key={`weather${i}`}>
            <Col xs={1} sm={2} />
            <Col xs={4} sm={3} className="ColMust d-flex align-items-center">
              {isDateChanged ? weather.date.substring(0, 10) : ""}
            </Col>
            <Col xs={2} className="d-flex align-items-center">
              {weather.date.includes("T09:00") ? <Row>Rano</Row> : null}
              {weather.date.includes("T12:00") ? <Row>Południe</Row> : null}
              {weather.date.includes("T18:00") ? <Row>Wieczór</Row> : null}
            </Col>
            <Col xs={2}>
              {weather.date.includes("T09:00") ? (
                <Image
                  className="WeatherIcon"
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.icon}
                />
              ) : null}
              {weather.date.includes("T12:00") ? (
                <Image
                  className="WeatherIcon"
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.icon}
                />
              ) : null}
              {weather.date.includes("T18:00") ? (
                <Image
                  className="WeatherIcon"
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.icon}
                />
              ) : null}
            </Col>
            <Col xs={2}>
              {weather.date.includes("T09:00") ? (
                <Row className="ColumnWhole d-flex align-items-center">
                  {parseInt(weather.temperature)}°C
                </Row>
              ) : null}
              {weather.date.includes("T12:00") ? (
                <Row className="ColumnWhole d-flex align-items-center">
                  {parseInt(weather.temperature)}°C
                </Row>
              ) : null}
              {weather.date.includes("T18:00") ? (
                <Row className="ColumnWhole d-flex align-items-center">
                  {parseInt(weather.temperature)}°C
                </Row>
              ) : null}
            </Col>
          </Row>
        );
      }
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
          <Row>
            <Col sm={6} className="DetailsContent">
              {weatherListJsx}
            </Col>
            <Col sm={6}>
              <Row className="RowMust Center DetailsContent d-flex justify-content-center">
                Cena za dobę przy oddaniu samochodu w punkcie:
              </Row>
              <Row className="Row PricesList d-flex justify-content-center">
                {endCitiesJsx}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CarDetails;
