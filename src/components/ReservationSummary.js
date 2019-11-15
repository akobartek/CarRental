import React from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

class ReservationSummary extends React.Component {
  constructor(props) {
    super(props);

    const values = window.location.href.split("?")[1].split("&");
    this.state = {
      showModal: false,
      carId: values[0].split("=")[1],
      startDate: values[1].split("=")[1],
      endDate: values[2].split("=")[1],
      startCity: values[3].split("=")[1],
      endCity: values[4].split("=")[1]
    };
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const days =
      (new Date(this.state.endDate).getTime() -
        new Date(this.state.startDate).getTime()) /
        (1000 * 3600 * 24) +
      1;
    return (
      <div className="CarDetails-body">
        <Container>
          <Row className="RowMust Center">
            <Col sm={12}>
              <h1>Podsumowanie</h1>
            </Col>
          </Row>
          <Row className="Row DetailsContent">
            <Col sm={5}>
              <img
                src="https://purepng.com/public/uploads/large/purepng.com-red-porsche-911-gt3-rs-4-carcarvehicletransportporsche-961524661235vbivb.png"
                alt="xD"
              />
            </Col>
            <Col sm={7}>
              <Row className="Row Center">
                <Col sm={12}>
                  <h1>Porsche 911</h1>
                </Col>
              </Row>
              <Row className="Row Center">
                <Col sm={12}>
                  <h5>
                    Miejsce odbioru: {this.state.startCity},{" "}
                    {this.state.startDate}
                  </h5>
                </Col>
              </Row>
              <Row className="Row Center">
                <Col sm={12}>
                  <h5>
                    Miejsce zwrotu: {this.state.endCity}, {this.state.endDate}
                  </h5>
                </Col>
              </Row>
              <Row className="Row Center">
                <Col sm={12}>
                  <h5>
                    {days} dni wypożyczenia, do zapłaty: {days * 115} zł
                  </h5>
                </Col>
              </Row>
              <Row className="Row CenterButton">
                <Col sm={12}>
                  <Button variant="primary" onClick={this.handleShowModal}>
                    Zatwierdź
                  </Button>

                  <Modal show={this.state.showModal}>
                    <Modal.Header>
                      <Modal.Title>Zarezerwowano samochód</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.handleCloseModal}>
                        Ok
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ReservationSummary;
