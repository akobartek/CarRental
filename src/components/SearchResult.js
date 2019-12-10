import React from "react";
import { Link } from "react-router-dom";
import "../Main.css";
import { Container, Form, Row, Col, Button, Collapse } from "react-bootstrap";
import DatePicker from "react-datepicker";
import InputRange from "react-input-range";
import "react-datepicker/dist/react-datepicker.css";
import "react-input-range/lib/css/index.css";
import FilterButton from "./FilterButton";
import LoadingModal from "./LoadingModal";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    const dateFrom = new Date(values[0].split("=")[1]);
    const carType = values[values.findIndex(it => it.includes("carType"))];
    const passengers =
      values[values.findIndex(it => it.includes("passengers"))];
    const gearbox = values[values.findIndex(it => it.includes("gearbox"))];
    const minHP = values[values.findIndex(it => it.includes("horsePowerFrom"))];
    const maxHP = values[values.findIndex(it => it.includes("horsePowerTo"))];

    this.state = {
      isViewExpanded: false,
      dateFrom: dateFrom,
      dateTo: new Date(values[1].split("=")[1]),
      minDate: new Date(dateFrom + 3600 * 1000 * 24),
      maxDate: new Date(dateFrom + 14 * 3600 * 1000 * 24),
      locationIdFrom: values[2].split("=")[1],
      horsePower: {
        min: minHP === undefined ? 0 : parseInt(minHP.split("=")[1]),
        max: maxHP === undefined ? 500 : parseInt(maxHP.split("=")[1])
      },
      carType: carType === undefined ? "" : carType.split("=")[1],
      passengers: passengers === undefined ? "" : passengers.split("=")[1],
      gearbox: gearbox === undefined ? "" : gearbox.split("=")[1],
      results: [],
      resultsFetched: false,
      filtersUpdated: false
    };
  }

  setStartDate = date => {
    this.state.minDate.setDate(date.getDate() + 1);
    this.state.maxDate.setDate(date.getDate() + 14);

    if (date >= this.state.dateTo)
      this.state.dateTo.setDate(date.getDate() + 1);
    if (this.state.dateTo > this.state.maxDate)
      this.state.dateTo.setDate(this.state.maxDate.getDate());

    this.setState({
      dateFrom: date,
      filtersUpdated: true
    });
  };

  setEndDate = date => {
    this.setState({
      dateTo: date,
      filtersUpdated: true
    });
  };

  onStartCityChange = e => {
    this.setState({
      locationIdFrom: e.target.options[e.target.selectedIndex].value,
      filtersUpdated: true
    });
  };

  onEndCityChange = e => {
    this.setState({
      locationIdTo: e.target.options[e.target.selectedIndex].value,
      filtersUpdated: true
    });
  };

  onCarTypeChange = e => {
    this.setState({
      carType: e.target.options[e.target.selectedIndex].value,
      filtersUpdated: true
    });
  };

  onPassengerNumberChange = e => {
    this.setState({
      passengers: e.target.options[e.target.selectedIndex].value,
      filtersUpdated: true
    });
  };

  onGearboxTypeChange = e => {
    this.setState({
      gearbox: e.target.options[e.target.selectedIndex].value,
      filtersUpdated: true
    });
  };

  onCollapseChange = () => {
    if (this.state.filtersUpdated) window.location.reload();
    else
      this.setState({
        isViewExpanded: !this.state.isViewExpanded
      });
  };

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    const changeState = results => {
      this.setState({ results: results, resultsFetched: true });
    };
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      `http://localhost:8080/api/carinstances?${
        window.location.href.split("?")[1]
      }`,
      true
    );
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      const data = JSON.parse(this.response);
      console.log(data);
      if (request.status === 200) {
        changeState(data);
      } else {
        alert(data);
      }
    };
    request.send();
  }

  render() {
    const resultListJsx = [];
    for (let i = 0; i < this.state.results.length; i++) {
      const result = this.state.results[i];
      resultListJsx.push(
        <Col sm={5} key={i} className="CarListItem">
          <Link
            to={{
              pathname: "/car",
              search:
                `?dateFrom=${this.state.dateFrom
                  .toISOString()
                  .substring(0, 10)}` +
                `&dateTo=${this.state.dateTo.toISOString().substring(0, 10)}` +
                `&locationIdFrom=${this.state.locationIdFrom}`,
              state: { selectedCar: result }
            }}
          >
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
                  <Col sm={7}>
                    <img
                      src={`https://car-rental-images.herokuapp.com/cars/${result.car.image}`}
                      alt={result.car.model}
                    />
                  </Col>
                  <Col sm={5}>
                    <h5>
                      Cena od:
                      <br />
                      {result.car.normalCost} zł/dzień
                    </h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Link>
        </Col>
      );
    }

    if (!this.state.resultsFetched) {
      return <LoadingModal />;
    }

    return (
      <div className="SearchResult-body">
        <Container>
          <Row className="SearchForm">
            <Container>
              <Collapse in={this.state.isViewExpanded}>
                <div>
                  <Row>
                    <Col sm={3} className="ColumnMust">
                      Od kiedy:
                      <DatePicker
                        className="DatePicker"
                        selected={this.state.dateFrom}
                        onChange={date => this.setStartDate(date)}
                        minDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </Col>
                    <Col sm={3} className="ColumnMust">
                      Do kiedy:
                      <DatePicker
                        className="DatePicker"
                        selected={this.state.dateTo}
                        onChange={date => this.setEndDate(date)}
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        dateFormat="dd-MM-yyyy"
                      />
                    </Col>
                    <Col sm={3} className="ColumnMust">
                      Skąd:
                      <Form.Control
                        as="select"
                        value={this.state.locationIdFrom}
                        onChange={this.onStartCityChange}
                      >
                        <option value="6">Wrocław, Bardzka 54/76</option>
                        <option value="7">Wrocław, Graniczna 32/87</option>
                        <option value="5">Wrocław, Krzywoustego 23/16</option>
                        <option value="2">Kłodzko, Szafowa 15/3</option>
                        <option value="3">Legnica, Potockiego 10/15</option>
                        <option value="4">Lubin, Parkowa 75/1</option>
                        <option value="1">Wałbrzych, Górska 2/1</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row className="Row">
                    <Col sm={3} className="Column">
                      Typ samochodu:
                      <Form.Control
                        as="select"
                        value={this.state.carType}
                        onChange={this.onCarTypeChange}
                      >
                        <option value=""></option>
                        <option value="city">Miejskie</option>
                        <option value="offroad">Terenowe</option>
                        <option value="truck">Dostawcze</option>
                      </Form.Control>
                    </Col>
                    <Col sm={3} className="Column">
                      Liczba pasażerów:
                      <Form.Control
                        as="select"
                        value={this.state.passengers}
                        onChange={this.onPassengerNumberChange}
                      >
                        <option value=""></option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                      </Form.Control>
                    </Col>
                    <Col sm={3} className="Column">
                      Skrzynia biegów:
                      <Form.Control
                        as="select"
                        value={this.state.gearbox}
                        onChange={this.onGearboxTypeChange}
                      >
                        <option value=""></option>
                        <option value="manual">Manualna</option>
                        <option value="automatic">Automatyczna</option>
                      </Form.Control>
                    </Col>
                    <Col sm={3} className="Column">
                      <div className="Center" style={{ marginBottom: "15px" }}>
                        Liczba KM:
                      </div>
                      <InputRange
                        minValue={0}
                        maxValue={500}
                        formatLabel={value => `${value} KM`}
                        value={this.state.horsePower}
                        onChange={value => this.setState({ horsePower: value })}
                      />
                    </Col>
                  </Row>
                </div>
              </Collapse>
              <Row>
                <Col sm={12} className="CenterButton">
                  {!this.state.filtersUpdated && (
                    <Button variant="secondary" onClick={this.onCollapseChange}>
                      Filtruj
                    </Button>
                  )}
                  {this.state.filtersUpdated && (
                    <FilterButton
                      state={this.state}
                      onClick={this.onCollapseChange}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          </Row>
          <Row className="Title">
            <Col sm={12}>Wyniki wyszukiwania:</Col>
          </Row>
          <Row className="Row CarList d-flex justify-content-center">
            {resultListJsx}
          </Row>
        </Container>
      </div>
    );
  }
}

export default SearchResult;
