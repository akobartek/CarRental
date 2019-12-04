import React from "react";
import { Link } from "react-router-dom";
import "../Main.css";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Collapse,
  Spinner,
  Modal
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterButton from "./FilterButton";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    const dateFrom = new Date(values[0].split("=")[1]);
    const locationIdTo =
      values[values.findIndex(it => it.includes("locationIdTo"))];
    const carType = values[values.findIndex(it => it.includes("carType"))];
    const passengers =
      values[values.findIndex(it => it.includes("passengers"))];
    const gearbox = values[values.findIndex(it => it.includes("gearbox"))];

    this.state = {
      isViewExpanded: false,
      dateFrom: dateFrom,
      dateTo: new Date(values[1].split("=")[1]),
      minDate: new Date(dateFrom + 3600 * 1000 * 24),
      maxDate: new Date(dateFrom + 14 * 3600 * 1000 * 24),
      locationIdFrom: values[2].split("=")[1],
      locationIdTo:
        locationIdTo === undefined ? undefined : locationIdTo.split("=")[1],
      carType: carType === undefined ? undefined : carType.split("=")[1],
      passengers:
        passengers === undefined ? undefined : passengers.split("=")[1],
      gearbox: gearbox === undefined ? undefined : gearbox.split("=")[1],
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
      let data = JSON.parse(this.response);
      if (request.status === 200) {
        changeState(data.map(obj => obj.car));
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
                      {result.brand} {result.model}
                    </h4>
                  </Col>
                </Row>
                <Row className="Row CarListInfo d-flex align-items-center">
                  <Col sm={7}>
                    <img
                      src={`https://car-rental-images.herokuapp.com/cars/${result.image}`}
                      alt={result.model}
                    />
                  </Col>
                  <Col sm={5}>
                    <h5>
                      Cena od:
                      <br />
                      {result.normalCost} zł/dzień
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
      return (
        <Modal.Dialog size="sm">
          <Modal.Body className="Center">
            <Spinner animation="border" role="status">
              <span className="sr-only Center">Ładowanie...</span>
            </Spinner>
            <h4 className="Center">Ładowanie...</h4>
          </Modal.Body>
        </Modal.Dialog>
      );
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
                        selected={this.state.dateFrom}
                        onChange={date => this.setStartDate(date)}
                        minDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </Col>
                    <Col sm={3} className="ColumnMust">
                      Do kiedy:
                      <DatePicker
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
                      Dokąd:
                      <Form.Control
                        as="select"
                        value={this.state.locationIdTo}
                        onChange={this.onEndCityChange}
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
                    <Col sm={3} className="Column">
                      Typ samochodu:
                      <Form.Control
                        as="select"
                        value={this.state.carType}
                        onChange={this.onCarTypeChange}
                      >
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
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="9">9</option>
                      </Form.Control>
                    </Col>
                    <Col sm={3} className="Column">
                      Skrzynia biegów:
                      <Form.Control
                        as="select"
                        value={this.state.gearbox}
                        onChange={this.onGearboxTypeChange}
                      >
                        <option value="manual">Manualna</option>
                        <option value="automatic">Automatyczna</option>
                      </Form.Control>
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
