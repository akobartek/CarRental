import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import CancelReportButton from "./CancelReportButton";
import SendReportButton from "./SendReportButton";

class FaultReport extends React.Component {
  state = {
    optionValues: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ],
    files: []
  };

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  addFile = file => {
    // console.log(file);
    this.setState({
      files: file.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  handleOptionChange = e => {
    const id = e.target.id.split("-");
    this.setState(state => {
      const newValues = this.state.optionValues;
      newValues[id[0]][id[1]] = parseInt(id[2]);

      return { optionValues: newValues };
    });
  };

  render() {
    return (
      <div className="FaultReport-body">
        <Container>
          <Row className="Row d-flex justify-content-center">
            <Col sm={4} className="FaultReportPart">
              <Row className="RowMust">
                <Col className="Center">Usterki uniemożliwiające jazdę</Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Przebita opona:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="0-0-0"
                      checked={this.state.optionValues[0][0] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="0-0-1"
                      checked={this.state.optionValues[0][0] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Niesprawny silnik:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="0-1-0"
                      checked={this.state.optionValues[0][1] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="0-1-1"
                      checked={this.state.optionValues[0][1] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Wył. akumulator:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="0-2-0"
                      checked={this.state.optionValues[0][2] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="0-2-1"
                      checked={this.state.optionValues[0][2] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Awaria hamulców:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="0-3-0"
                      checked={this.state.optionValues[0][3] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="0-3-1"
                      checked={this.state.optionValues[0][3] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Awaria sprzęgła:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="0-4-0"
                      checked={this.state.optionValues[0][4] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="0-4-1"
                      checked={this.state.optionValues[0][4] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>Inna (proszę podać opis):</Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control as="textarea" rows="4" id="TextArea1" />
                </Col>
              </Row>
            </Col>
            <Col sm={4} className="FaultReportPart">
              <Row className="RowMust">
                <Col className="Center">Usterki umożliwiające jazdę</Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Awaria świateł:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="1-0-0"
                      checked={this.state.optionValues[1][0] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="1-0-1"
                      checked={this.state.optionValues[1][0] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Zarysowanie:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="1-1-0"
                      checked={this.state.optionValues[1][1] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="1-1-1"
                      checked={this.state.optionValues[1][1] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Brak płynów:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="1-2-0"
                      checked={this.state.optionValues[1][2] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="1-2-1"
                      checked={this.state.optionValues[1][2] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Zużyte wycieraczki:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="1-3-0"
                      checked={this.state.optionValues[1][3] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="1-3-1"
                      checked={this.state.optionValues[1][3] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="Row">
                <Col className="d-flex">
                  <div className="flex-grow-1">Awaria klimatyzacji:</div>
                  <div>
                    <Form.Check
                      inline
                      label="Tak"
                      type="radio"
                      id="1-4-0"
                      checked={this.state.optionValues[1][4] === 0}
                      onChange={this.handleOptionChange}
                    />
                    <Form.Check
                      inline
                      label="Nie"
                      type="radio"
                      id="1-4-1"
                      checked={this.state.optionValues[1][4] === 1}
                      onChange={this.handleOptionChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>Inna (proszę podać opis):</Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control as="textarea" rows="4" id="TextArea2" />
                </Col>
              </Row>
            </Col>
            <Col sm={3} className="FaultReportPart">
              <Row className="RowMust">
                <Col className="Center">Wgraj zdjęcie</Col>
              </Row>
              <Row className="Row">
                <Col className="Center">
                  <ImageUpload
                    addFile={this.addFile}
                    files={this.state.files}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="Row">
            <Col sm={4}></Col>
            <Col sm={4} className="d-flex justify-content-around">
              <CancelReportButton />
              <SendReportButton
                state={this.state}
                rentalId={this.props.match.params.rentalId}
              />
            </Col>
            <Col sm={4}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FaultReport;
