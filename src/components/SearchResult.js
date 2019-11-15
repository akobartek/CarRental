import React from "react";
import { Link } from "react-router-dom";
import "../Main.css";
import { Container, Form, Row, Col, Button, Collapse } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterButton from "./FilterButton";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    const startDate = new Date(values[0].split("=")[1]);
    const endCity = values[values.findIndex(it => it.includes("endCity"))];
    const carType = values[values.findIndex(it => it.includes("carType"))];
    const passengers =
      values[values.findIndex(it => it.includes("passengers"))];
    const gearbox = values[values.findIndex(it => it.includes("gearbox"))];

    this.state = {
      isViewExpanded: false,
      startDate: startDate,
      endDate: new Date(values[1].split("=")[1]),
      minDate: new Date(startDate + 3600 * 1000 * 24),
      maxDate: new Date(startDate + 14 * 3600 * 1000 * 24),
      startCity: values[2].split("=")[1],
      endCity: endCity === undefined ? undefined : endCity.split("=")[1],
      carType: carType === undefined ? undefined : carType.split("=")[1],
      passengers:
        passengers === undefined ? undefined : passengers.split("=")[1],
      gearbox: gearbox === undefined ? undefined : gearbox.split("=")[1],
      results: [
        {
          id: "2137xD",
          name: "Opel Astra",
          photoUrl:
            "https://fudeksrentacar.rs/assets/site/images/cars/Opel-Astra-H.png_1488550268",
          price: 911
        },
        {
          id: "2137xDDD",
          name: "Seat Ateca",
          photoUrl:
            "https://www.wilsonsofrathkenny.co.uk/newmodels/cupra-exterior-car-color-rodium-grey.png",
          price: 911
        },
        {
          id: "2137xDDDDD",
          name: "BMW X4",
          photoUrl:
            "https://c4d709dd302a2586107d-f8305d22c3db1fdd6f8607b49e47a10c.ssl.cf1.rackcdn.com/thumbnails/stock-images/3d52fb08327bc7c26529b3f46909a97b.png",
          price: 911
        },
        {
          id: "2138xD",
          name: "Porsche 911",
          photoUrl:
            "https://purepng.com/public/uploads/large/purepng.com-red-porsche-911-gt3-rs-4-carcarvehicletransportporsche-961524661235vbivb.png",
          price: 911
        },
        {
          id: "2138xDDD",
          name: "VW Passat",
          photoUrl: "http://valdiexpress.pl/files/passat1.png",
          price: 911
        }
      ]
    };
  }

  setStartDate = date => {
    this.state.minDate.setDate(date.getDate() + 1);
    this.state.maxDate.setDate(date.getDate() + 14);

    if (date >= this.state.endDate)
      this.state.endDate.setDate(date.getDate() + 1);
    if (this.state.endDate > this.state.maxDate)
      this.state.endDate.setDate(this.state.maxDate.getDate());

    this.setState({
      startDate: date
    });
  };

  setEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  onStartCityChange = e => {
    this.setState({
      startCity: e.target.options[e.target.selectedIndex].value
    });
  };

  onEndCityChange = e => {
    this.setState({
      endCity: e.target.options[e.target.selectedIndex].value
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

  // componentWillMount() {
  // var promise = this.getResults();
  // promise.then(
  //   result => {
  //     this.setState({ results: result.results });
  //   },
  //   function(error) {
  //     console.log(error);
  //   }
  // );
  // }

  // async getResults() {
  // const response = await fetch(this.popularMoviesUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // });
  // const myJson = await response.json(); //extract JSON from the http response
  // console.log(myJson);
  // // do something with myJson
  // return myJson;
  // }

  render() {
    const resultListJsx = [];
    for (let i = 0; i < this.state.results.length; i++) {
      const result = this.state.results[i];
      resultListJsx.push(
        <Col sm={5} key={i} className="CarListItem">
          <Link
            to={
              `/car?carId=${result.id}` +
              `&startDate=${this.state.startDate
                .toISOString()
                .substring(0, 10)}` +
              `&endDate=${this.state.endDate.toISOString().substring(0, 10)}` +
              `&startCity=${this.state.startCity}`
            }
          >
            <Row className="RowMust CarListName">
              <Col sm={12}>
                <h4>{result.name}</h4>
              </Col>
            </Row>
            <Row className="Row CarListInfo d-flex align-items-center">
              <Col sm={7}>
                <img src={result.photoUrl} alt={result.name} />
              </Col>
              <Col sm={5}>
                <h5>
                  Cena od:
                  <br />
                  {result.price} zł/dzień
                </h5>
              </Col>
            </Row>
          </Link>
        </Col>
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
                        selected={this.state.startDate}
                        onChange={date => this.setStartDate(date)}
                        minDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </Col>
                    <Col sm={3} className="ColumnMust">
                      Do kiedy:
                      <DatePicker
                        selected={this.state.endDate}
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
                        value={this.state.startCity}
                        onChange={this.onStartCityChange}
                      >
                        <option value="Wroclaw">Wrocław</option>
                        <option value="JeleniaGora">Jelenia Góra</option>
                        <option value="Glogow">Głogów</option>
                        <option value="Legnica">Legnica</option>
                        <option value="Walbrzych">Wałbrzych</option>
                      </Form.Control>
                    </Col>
                    <Col sm={3} className="Column">
                      Dokąd:
                      <Form.Control
                        as="select"
                        value={this.state.endCity}
                        onChange={this.onEndCityChange}
                      >
                        <option value="Wroclaw">Wrocław</option>
                        <option value="JeleniaGora">Jelenia Góra</option>
                        <option value="Glogow">Głogów</option>
                        <option value="Legnica">Legnica</option>
                        <option value="Walbrzych">Wałbrzych</option>
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
                        <option value="semiautomatic">Półautomatyczna</option>
                        <option value="automatic">Automatyczna</option>
                      </Form.Control>
                    </Col>
                    <Col sm={3} className="CenterButton">
                      <FilterButton state={this.state} />
                    </Col>
                  </Row>
                </div>
              </Collapse>
              <Row>
                <Col sm={12} className="CenterButton">
                  <Button variant="secondary" onClick={this.onCollapseChange}>
                    Filtruj
                  </Button>
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
