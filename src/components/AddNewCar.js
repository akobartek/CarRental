import React from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import AddCarRequest from "../model/AddCarRequest";

class AddNewCar extends React.Component {
  state = {
    possibleColors: [
      "Biały",
      "Czarny",
      "Czerwony",
      "Niebieski",
      "Pomarańczowy",
      "Srebrny",
      "Zielony",
      "Żółty"
    ],
    selectedColor: "",
    selectedGearbox: "",
    selectedType: "",
    selectedLocation: "",
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
          <Row className="Row">
            <Col sm={12}>
              <Formik
                initialValues={{
                  brand: "",
                  model: "",
                  vin: "",
                  registrationNumber: "",
                  price: "",
                  horsePower: ""
                }}
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
                    values.horsePower,
                    selected.optionValues[2] === 1 ? "Nie" : "Tak",
                    selected.optionValues[1] === 1 ? "Nie" : "Tak",
                    selected.optionValues[3] === 1 ? "Nie" : "Tak",
                    selected.optionValues[0] === 1 ? "Nie" : "Tak",
                    values.brand,
                    values.model,
                    values.price,
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
                  brand: Yup.string().required("Uzupełnij markę pojazdu!"),
                  model: Yup.string().required("Uzupełnij model pojazdu!"),
                  vin: Yup.string().required("VIN nie może być pusty!"),
                  registrationNumber: Yup.string().required(
                    "Numer rejestracyjny nie może być pusty!"
                  ),
                  price: Yup.number("Cena musi być liczbą!").required(
                    "Uzupełnij cenę!"
                  ),
                  horsePower: Yup.number("Liczba KM musi być liczbą!").required(
                    "Uzupełnij moc silnika!"
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
                      <Row className="Row ">
                        <Col sm={4} className="SignInPart">
                          <Form.Control
                            name="brand"
                            type="brand"
                            placeholder="Marka"
                            value={values.brand}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.brand && touched.brand && "error"}
                          />
                          {errors.brand && touched.brand && (
                            <div className="input-feedback">{errors.brand}</div>
                          )}
                        </Col>
                        <Col sm={4} className="SignInPart">
                          <Form.Control
                            name="model"
                            type="model"
                            placeholder="Model"
                            value={values.model}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.model && touched.model && "error"}
                          />
                          {errors.model && touched.model && (
                            <div className="input-feedback">{errors.model}</div>
                          )}
                        </Col>
                        <Col sm={4} className="SignInPart">
                          <Form.Control
                            name="price"
                            type="number"
                            placeholder="Cena za dobę"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.price && touched.price && "error"}
                          />
                          {errors.price && touched.price && (
                            <div className="input-feedback">{errors.price}</div>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4} className="SignInPart">
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
                        <Col sm={4} className="SignInPart">
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
                        <Col sm={4} className="SignInPart">
                          <Form.Control
                            name="horsePower"
                            type="number"
                            placeholder="Liczba KM"
                            value={values.horsePower}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.horsePower && touched.horsePower && "error"
                            }
                          />
                          {errors.horsePower && touched.horsePower && (
                            <div className="input-feedback">
                              {errors.horsePower}
                            </div>
                          )}
                        </Col>
                      </Row>
                      <Row className="Row SignInPart">
                        <Col sm={1} className="d-flex align-items-center">
                          <b>Kolor:</b>
                        </Col>
                        <Col sm={3} className="d-flex align-items-center">
                          <Form.Control
                            as="select"
                            onChange={this.onColorSelected}
                          >
                            {this.state.possibleColors.map(obj => (
                              <option key={obj} value={obj}>
                                {obj}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col sm={1} className="d-flex align-items-center">
                          <b>Typ:</b>
                        </Col>
                        <Col sm={3} className="d-flex align-items-center">
                          <Form.Control
                            as="select"
                            onChange={this.onCarTypeChange}
                          >
                            <option value="city">Miejskie</option>
                            <option value="offroad">Terenowe</option>
                            <option value="truck">Dostawcze</option>
                          </Form.Control>
                        </Col>
                        <Col sm={1} className="d-flex align-items-center">
                          <b>Stacja:</b>
                        </Col>
                        <Col sm={3} className="d-flex align-items-center">
                          <Form.Control
                            as="select"
                            onChange={this.onLocationChange}
                          >
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
                      </Row>
                      <Row className="Row SignInPart">
                        <Col sm={2} className="d-flex align-items-center">
                          <b>Liczba pasażerów:</b>
                        </Col>
                        <Col sm={4} className="d-flex align-items-center">
                          <Form.Control
                            as="select"
                            onChange={this.onPassengerNumberChange}
                          >
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                          </Form.Control>
                        </Col>
                        <Col sm={2} className="d-flex align-items-center">
                          <b>Skrzynia biegów:</b>
                        </Col>
                        <Col sm={4} className="d-flex align-items-center">
                          <Form.Control
                            as="select"
                            onChange={this.onGearboxTypeChange}
                          >
                            <option value="manual">Manualna</option>
                            <option value="automatic">Automatyczna</option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="Row">
                        <Col
                          xs={6}
                          sm={3}
                          className="d-flex SignInPart"
                          style={{ padding: "0" }}
                        >
                          <div className="d-flex justify-content-center flex-grow-1">
                            <b>GPS?</b>
                          </div>
                          <div className="d-flex justify-content-start">
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
                        <Col
                          xs={6}
                          sm={3}
                          className="d-flex SignInPart"
                          style={{ padding: "0" }}
                        >
                          <div className="d-flex justify-content-center flex-grow-1">
                            <b>Klima?</b>
                          </div>
                          <div className="d-flex justify-content-start">
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
                        <Col
                          xs={6}
                          sm={3}
                          className="d-flex SignInPart"
                          style={{ padding: "0" }}
                        >
                          <div className="d-flex justify-content-center flex-grow-1">
                            <b>4x4?</b>
                          </div>
                          <div className="d-flex justify-content-start">
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
                        <Col
                          xs={6}
                          sm={3}
                          className="d-flex SignInPart"
                          style={{ padding: "0" }}
                        >
                          <div className="flex-grow-1 d-flex justify-content-center">
                            <b>Kabrio?</b>
                          </div>
                          <div className="d-flex justify-content-start">
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
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button
                          className="SignInPart"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Zapisz
                        </Button>
                      </div>
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
