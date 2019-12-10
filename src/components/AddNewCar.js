import React from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import InputRange from "react-input-range";
import * as Yup from "yup";
import AddCarRequest from "../model/AddCarRequest";

class AddNewCar extends React.Component {
  state = {
    possibleCars: [
      {
        brand: "Audi",
        models: [
          {
            model: "A1",
            colors: ["Czarny", "Czerwony", "Biały", "Żółty"],
            cabrioPossible: false
          },
          {
            model: "A5",
            colors: ["Czarny", "Czerwony", "Biały"],
            cabrioPossible: true
          },
          {
            model: "TT",
            colors: ["Czarny", "Czerwony", "Żółty"],
            cabrioPossible: true
          }
        ]
      },
      {
        brand: "Ford",
        models: [
          {
            model: "Fiesta",
            colors: ["Czarny", "Czerwony", "Niebieski"],
            cabrioPossible: false
          }
        ]
      },
      {
        brand: "Jeep",
        models: [
          {
            model: "Longitude",
            colors: ["Czarny", "Pomarańczowy", "Biały"],
            cabrioPossible: false
          },
          {
            model: "Wrangler Sahara",
            colors: ["Czarny", "Pomarańczowy", "Niebieski", "Zielony", "Żółty"],
            cabrioPossible: false
          }
        ]
      },
      {
        brand: "Mercedes-Benz",
        models: [
          {
            model: "C 300 Sedan",
            colors: ["Czarny", "Niebieski", "Biały", "Czerwony"],
            cabrioPossible: false
          },
          {
            model: "G 550 SUV",
            colors: ["Czarny", "Niebieski", "Biały"],
            cabrioPossible: false
          }
        ]
      },
      {
        brand: "Opel",
        models: [
          {
            model: "Corsa",
            colors: ["Niebieski", "Biały"],
            cabrioPossible: false
          }
        ]
      },
      {
        brand: "Peugeot",
        models: [
          {
            model: "Expert",
            colors: ["Biały"],
            cabrioPossible: false
          }
        ]
      },
      {
        brand: "Renault",
        models: [
          {
            model: "Master",
            colors: ["Biały"],
            cabrioPossible: false
          }
        ]
      },
      {
        brand: "Toyota",
        models: [
          {
            model: "GT86",
            colors: ["Niebieski", "Czerwony", "Srebrny"],
            cabrioPossible: false
          }
        ]
      },
      {
        brand: "Volkswagen",
        models: [
          {
            model: "T5",
            colors: ["Biały"],
            cabrioPossible: false
          }
        ]
      }
    ],
    selectedBrand: "",
    selectedModel: "",
    selectedColor: "",
    selectedGearbox: "",
    selectedType: "",
    selectedLocation: "",
    horsePower: 100,
    normalCost: 100,
    passengers: "",
    optionValues: [1, 1, 1, 1],
    showEndReport: false,
    isSuccessful: false
  };

  handleShowSuccessModal = () => {
    this.setState({ showEndReport: true, isSuccessful: true });
  };
  handleShowFailModal = () => {
    this.setState({ showEndReport: true, isSuccessful: false });
  };
  handleCloseModal = () => {
    this.setState({ showEndReport: false });
  };

  onBrandSelected = e => {
    this.setState({
      selectedBrand: e.target.options[e.target.selectedIndex].value,
      selectedModel: "",
      selectedColor: "",
      selectedGearbox: "",
      selectedType: "",
      selectedLocation: ""
    });
  };

  onModelSelected = e => {
    this.setState({
      selectedModel: e.target.options[e.target.selectedIndex].value,
      selectedColor: "",
      selectedGearbox: "",
      selectedType: "",
      selectedLocation: ""
    });
  };

  onColorSelected = e => {
    this.setState({
      selectedColor: e.target.options[e.target.selectedIndex].value
    });
  };

  onCarTypeChange = e => {
    this.setState({
      selectedType: e.target.options[e.target.selectedIndex].value
    });
  };

  onPassengerNumberChange = e => {
    this.setState({
      passengers: e.target.options[e.target.selectedIndex].value
    });
  };

  onGearboxTypeChange = e => {
    this.setState({
      selectedGearbox: e.target.options[e.target.selectedIndex].value
    });
  };

  onLocationChange = e => {
    this.setState({
      selectedLocation: e.target.options[e.target.selectedIndex].value
    });
  };

  handleOptionChange = e => {
    const id = e.target.id.split("-");
    this.setState(state => {
      const newValues = this.state.optionValues;
      newValues[id[0]] = parseInt(id[1]);

      return { optionValues: newValues };
    });
  };

  render() {
    let selected = this.state;
    const showSuccessModal = this.handleShowSuccessModal;
    const showFailModal = this.handleShowFailModal;
    const closeModal = this.handleCloseModal;

    return (
      <div className="AddCar-body">
        <Container>
          <Row className="Row SignInPart">
            <Col sm={12}>
              <Formik
                initialValues={{ vin: "", registrationNumber: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  const request = new XMLHttpRequest();
                  request.open(
                    "POST",
                    "http://localhost:8080/api/add-new-car",
                    true
                  );
                  request.setRequestHeader("Content-Type", "application/json");
                  request.setRequestHeader(
                    "tokenObject",
                    localStorage.getItem("token")
                  );
                  request.onload = function() {
                    if (request.status === 200) {
                      setSubmitting(false);
                      showSuccessModal();
                    } else {
                      setSubmitting(false);
                      showFailModal();
                    }
                  };
                  const addCarRequest = new AddCarRequest(
                    selected.selectedColor,
                    selected.selectedGearbox,
                    selected.horsePower,
                    selected.optionValues[2] === 1 ? "Nie" : "Tak",
                    selected.optionValues[1] === 1 ? "Nie" : "Tak",
                    selected.optionValues[3] === 1 ? "Nie" : "Tak",
                    selected.optionValues[0] === 1 ? "Nie" : "Tak",
                    selected.selectedBrand,
                    selected.selectedModel,
                    selected.normalCost,
                    selected.passengers,
                    selected.selectedType,
                    values.vin,
                    values.registrationNumber,
                    "Tak",
                    selected.selectedLocation
                  );
                  request.send(JSON.stringify(addCarRequest));
                }}
                validationSchema={Yup.object().shape({
                  vin: Yup.string().required("VIN nie może być pusty!"),
                  registrationNumber: Yup.string().required(
                    "Numer rejestracyjny nie może być pusty!"
                  )
                })}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                  } = props;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Row className="Row SignInPart">
                        <Col sm={1}>Marka:</Col>
                        <Col sm={3}>
                          <Form.Control
                            as="select"
                            onChange={this.onBrandSelected}
                          >
                            <option value=""></option>
                            {this.state.possibleCars.map(obj => (
                              <option key={obj.brand} value={obj.brand}>
                                {obj.brand}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        {this.state.selectedBrand !== "" ? (
                          <>
                            <Col sm={1}>Model:</Col>
                            <Col sm={3}>
                              <Form.Control
                                as="select"
                                onChange={this.onModelSelected}
                              >
                                <option value=""></option>
                                {this.state.possibleCars
                                  .filter(
                                    obj =>
                                      obj.brand === this.state.selectedBrand
                                  )[0]
                                  .models.map(obj => (
                                    <option key={obj.model} value={obj.model}>
                                      {obj.model}
                                    </option>
                                  ))}
                              </Form.Control>
                            </Col>
                          </>
                        ) : null}
                        {this.state.selectedModel !== "" ? (
                          <>
                            <Col sm={1}>Kolor:</Col>
                            <Col sm={3}>
                              <Form.Control
                                as="select"
                                onChange={this.onColorSelected}
                              >
                                <option value=""></option>
                                {this.state.possibleCars
                                  .filter(
                                    obj =>
                                      obj.brand === this.state.selectedBrand
                                  )[0]
                                  .models.filter(
                                    obj =>
                                      obj.model === this.state.selectedModel
                                  )[0]
                                  .colors.map(obj => (
                                    <option key={obj} value={obj}>
                                      {obj}
                                    </option>
                                  ))}
                              </Form.Control>
                            </Col>
                          </>
                        ) : null}
                      </Row>
                      <Row className="Row SignInPart">
                        {this.state.selectedColor !== "" ? (
                          <>
                            <Col sm={1}>Typ:</Col>
                            <Col sm={3}>
                              <Form.Control
                                as="select"
                                onChange={this.onCarTypeChange}
                              >
                                <option value=""></option>
                                <option value="city">Miejskie</option>
                                <option value="offroad">Terenowe</option>
                                <option value="truck">Dostawcze</option>
                              </Form.Control>
                            </Col>
                          </>
                        ) : null}
                        {this.state.selectedType !== "" ? (
                          <>
                            <Col sm={2}>Liczba pasażerów:</Col>
                            <Col sm={2}>
                              <Form.Control
                                as="select"
                                onChange={this.onPassengerNumberChange}
                              >
                                <option value=""></option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                              </Form.Control>
                            </Col>
                          </>
                        ) : null}
                        {this.state.passengers !== "" ? (
                          <>
                            <Col sm={1}>Skrz. biegów:</Col>
                            <Col sm={3}>
                              <Form.Control
                                as="select"
                                onChange={this.onGearboxTypeChange}
                              >
                                <option value=""></option>
                                <option value="manual">Manualna</option>
                                <option value="automatic">Automatyczna</option>
                              </Form.Control>
                            </Col>
                          </>
                        ) : null}
                      </Row>
                      <Row className="Row SignInPart">
                        {this.state.selectedGearbox !== "" ? (
                          <>
                            <Col sm={1}>Stacja:</Col>
                            <Col sm={3}>
                              <Form.Control
                                as="select"
                                onChange={this.onLocationChange}
                              >
                                <option value=""></option>
                                <option value="Wrocław, Bardzka 54/76">
                                  Wrocław, Bardzka 54/76
                                </option>
                                <option value="Wrocław, Graniczna 32/87">
                                  Wrocław, Graniczna 32/87
                                </option>
                                <option value="Wrocław, Krzywoustego 23/16">
                                  Wrocław, Krzywoustego 23/16
                                </option>
                                <option value="Kłodzko, Szafowa 15/3">
                                  Kłodzko, Szafowa 15/3
                                </option>
                                <option value="Legnica, Potockiego 10/15">
                                  Legnica, Potockiego 10/15
                                </option>
                                <option value="Lubin, Parkowa 75/1">
                                  Lubin, Parkowa 75/1
                                </option>
                                <option value="Wałbrzych, Górska 2/1">
                                  Wałbrzych, Górska 2/1
                                </option>
                              </Form.Control>
                            </Col>
                          </>
                        ) : null}
                        {this.state.selectedLocation !== "" ? (
                          <>
                            <Col sm={1}>KM:</Col>
                            <Col
                              sm={3}
                              style={{
                                marginBottom: "15px",
                                marginTop: "15px"
                              }}
                            >
                              <InputRange
                                minValue={0}
                                maxValue={500}
                                formatLabel={value => `${value} KM`}
                                value={this.state.horsePower}
                                onChange={value =>
                                  this.setState({ horsePower: value })
                                }
                              />
                            </Col>
                            <Col sm={1}>Cena:</Col>
                            <Col
                              sm={3}
                              style={{
                                marginBottom: "15px",
                                marginTop: "15px"
                              }}
                            >
                              <InputRange
                                minValue={0}
                                maxValue={500}
                                formatLabel={value => `${value} zł`}
                                value={this.state.normalCost}
                                onChange={value =>
                                  this.setState({ normalCost: value })
                                }
                              />
                            </Col>
                          </>
                        ) : null}
                      </Row>
                      {this.state.selectedLocation !== "" ? (
                        <Row className="Row SignInPart">
                          <Col sm={1} />
                          <Col sm={3} className="d-flex">
                            <div className="flex-grow-1">GPS?</div>
                            <div>
                              <Form.Check
                                inline
                                label="Tak"
                                type="radio"
                                id="0-0"
                                checked={this.state.optionValues[0] === 0}
                                onChange={this.handleOptionChange}
                              />
                              <Form.Check
                                inline
                                label="Nie"
                                type="radio"
                                id="0-1"
                                checked={this.state.optionValues[0] === 1}
                                onChange={this.handleOptionChange}
                              />
                            </div>
                          </Col>
                          <Col sm={3} className="d-flex">
                            <div className="flex-grow-1">Klima?</div>
                            <div>
                              <Form.Check
                                inline
                                label="Tak"
                                type="radio"
                                id="1-0"
                                checked={this.state.optionValues[1] === 0}
                                onChange={this.handleOptionChange}
                              />
                              <Form.Check
                                inline
                                label="Nie"
                                type="radio"
                                id="1-1"
                                checked={this.state.optionValues[1] === 1}
                                onChange={this.handleOptionChange}
                              />
                            </div>
                          </Col>
                          <Col sm={3} className="d-flex">
                            <div className="flex-grow-1">4x4?</div>
                            <div>
                              <Form.Check
                                inline
                                label="Tak"
                                type="radio"
                                id="2-0"
                                checked={this.state.optionValues[2] === 0}
                                onChange={this.handleOptionChange}
                              />
                              <Form.Check
                                inline
                                label="Nie"
                                type="radio"
                                id="2-1"
                                checked={this.state.optionValues[2] === 1}
                                onChange={this.handleOptionChange}
                              />
                            </div>
                          </Col>
                        </Row>
                      ) : null}
                      {this.state.selectedLocation !== "" ? (
                        <Row>
                          <Col sm={4}>
                            <Form.Label className="SignInPart" htmlFor="vin">
                              VIN
                            </Form.Label>
                            <Form.Control
                              name="vin"
                              type="vin"
                              placeholder="VIN"
                              value={values.vin}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.vin && touched.vin && "error"}
                            />
                            {errors.vin && touched.vin && (
                              <div className="input-feedback">{errors.vin}</div>
                            )}
                          </Col>
                          <Col sm={4}>
                            <Form.Label
                              className="SignInPart"
                              htmlFor="registrationNumber"
                            >
                              Rejestracja
                            </Form.Label>
                            <Form.Control
                              name="registrationNumber"
                              type="registrationNumber"
                              placeholder="Rejestracja"
                              value={values.registrationNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.registrationNumber &&
                                touched.registrationNumber &&
                                "error"
                              }
                            />
                            {errors.registrationNumber &&
                              touched.registrationNumber && (
                                <div className="input-feedback">
                                  {errors.registrationNumber}
                                </div>
                              )}
                          </Col>

                          {this.state.possibleCars
                            .filter(
                              obj => obj.brand === this.state.selectedBrand
                            )[0]
                            .models.filter(
                              obj => obj.model === this.state.selectedModel
                            )[0].cabrioPossible ? (
                            <Col sm={4} className="d-flex align-items-center">
                              <div className="flex-grow-1">Kabrio?</div>
                              <div>
                                <Form.Check
                                  inline
                                  label="Tak"
                                  type="radio"
                                  id="3-0"
                                  checked={this.state.optionValues[3] === 0}
                                  onChange={this.handleOptionChange}
                                />
                                <Form.Check
                                  inline
                                  label="Nie"
                                  type="radio"
                                  id="3-1"
                                  checked={this.state.optionValues[3] === 1}
                                  onChange={this.handleOptionChange}
                                />
                              </div>
                            </Col>
                          ) : null}
                        </Row>
                      ) : null}
                      {this.state.selectedLocation !== "" ? (
                        <div className="d-flex justify-content-center">
                          <Button
                            className="SignInPart"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Zapisz
                          </Button>
                        </div>
                      ) : null}
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
          <Modal show={this.state.showEndReport} centered>
            <Modal.Header>
              <Modal.Title>
                {this.state.isSuccessful
                  ? "Dodano samochód!"
                  : "Wystąpił błąd, spróbuj dodać ponownie!"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button
                variant="outline-primary"
                onClick={
                  this.state.isSuccessful
                    ? this.props.history.goBack
                    : closeModal
                }
              >
                Powrót
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default AddNewCar;
