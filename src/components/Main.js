import React from "react";
import "../Main.css";
import { Container, Form, Row, Col, Collapse } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchButton from "./SearchButton";

class Main extends React.Component {
  state = {
    isViewExpanded: false,
    dateFrom: new Date(),
    dateTo: new Date(Date.now() + 3600 * 1000 * 24),
    minDate: new Date(Date.now() + 3600 * 1000 * 24),
    maxDate: new Date(Date.now() + 14 * 3600 * 1000 * 24),
    locationIdFrom: "6",
    locationIdTo: null,
    carType: null,
    passengers: null,
    gearbox: null
  };

  setStartDate = date => {
    this.state.minDate.setDate(date.getDate() + 1);
    this.state.maxDate.setDate(date.getDate() + 14);

    if (date >= this.state.dateTo)
      this.state.dateTo.setDate(date.getDate() + 1);
    if (this.state.dateTo > this.state.maxDate)
      this.state.dateTo.setDate(this.state.maxDate.getDate());

    this.setState({
      dateFrom: date
    });
  };

  setEndDate = date => {
    this.setState({
      dateTo: date
    });
  };

  onStartCityChange = e => {
    this.setState({
      locationIdFrom: e.target.options[e.target.selectedIndex].value
    });
  };

  onEndCityChange = e => {
    this.setState({
      locationIdTo: e.target.options[e.target.selectedIndex].value
    });
  };

  onCarTypeChange = e => {
    this.setState({
      carType: e.target.options[e.target.selectedIndex].value
    });
  };

  onPassengerNumberChange = e => {
    this.setState({
      passengers: e.target.options[e.target.selectedIndex].value
    });
  };

  onGearboxTypeChange = e => {
    this.setState({
      gearbox: e.target.options[e.target.selectedIndex].value
    });
  };

  onCollapseChange = () => {
    this.setState({
      isViewExpanded: !this.state.isViewExpanded
    });
  };

  render() {
    return (
      <div className="Main-body">
        <Container>
          <Row className="Title">
            <Col sm={12}>Znajdź swój samochód</Col>
          </Row>
          <Row className="RowMust">
            <Col sm={4}>Od kiedy:</Col>
            <Col sm={8}>
              <DatePicker
                selected={this.state.dateFrom}
                onChange={date => this.setStartDate(date)}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
              />
            </Col>
          </Row>
          <Row className="RowMust">
            <Col sm={4}>Do kiedy:</Col>
            <Col sm={8}>
              <DatePicker
                selected={this.state.dateTo}
                onChange={date => this.setEndDate(date)}
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
                dateFormat="dd-MM-yyyy"
              />
            </Col>
          </Row>
          <Row className="RowMust">
            <Col sm={4}>Skąd:</Col>
            <Col sm={8}>
              <Form.Control as="select" onChange={this.onStartCityChange}>
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
          <Row className="ButtonRow">
            {!this.state.isViewExpanded && (
              <Col sm={12}>
                <SearchButton state={this.state} />
              </Col>
            )}
          </Row>
          <Row className="Expand">
            {this.state.isViewExpanded && (
              <p onClick={this.onCollapseChange}>Mniej opcji...</p>
            )}
            {!this.state.isViewExpanded && (
              <p onClick={this.onCollapseChange}>Więcej opcji...</p>
            )}
          </Row>
          <Collapse in={this.state.isViewExpanded}>
            <div>
              <Row className="Row">
                <Col sm={4}>Dokąd:</Col>
                <Col sm={8}>
                  <Form.Control as="select" onChange={this.onEndCityChange}>
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
                <Col sm={4}>Typ samochodu:</Col>
                <Col sm={8}>
                  <Form.Control as="select" onChange={this.onCarTypeChange}>
                    <option value="city">Miejskie</option>
                    <option value="offroad">Terenowe</option>
                    <option value="truck">Dostawcze</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row className="Row">
                <Col sm={4}>Liczba pasażerów:</Col>
                <Col sm={8}>
                  <Form.Control
                    as="select"
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
              </Row>
              <Row className="Row">
                <Col sm={4}>Skrzynia biegów:</Col>
                <Col sm={8}>
                  <Form.Control as="select" onChange={this.onGearboxTypeChange}>
                    <option value="manual">Manualna</option>
                    <option value="automatic">Automatyczna</option>
                  </Form.Control>
                </Col>
              </Row>
            </div>
          </Collapse>
          <Row className="ButtonRow">
            {this.state.isViewExpanded && (
              <Col sm={12}>
                <SearchButton state={this.state} />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;
