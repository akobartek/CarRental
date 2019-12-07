import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoadingModal from "./LoadingModal";
import GetReportsRequest from "../model/GetReportsRequest";

class ReportsList extends React.Component {
  state = {
    reports: [],
    reportsFetched: false
  };

  componentDidMount() {
    this.getReports();
  }

  getReports() {
    const changeState = results => {
      this.setState({ reports: results, reportsFetched: true });
    };
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      "http://localhost:8080/api/findDamagesForRental",
      true
    );
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("tokenObject", localStorage.getItem("token"));
    request.onload = function() {
      let data = JSON.parse(this.response);
      if (request.status === 200) {
        changeState(data);
        console.log(data);
      } else {
        alert(data);
      }
    };
    const getReportsRequest = new GetReportsRequest(
      this.props.match.params.rentalId
    );
    request.send(JSON.stringify(getReportsRequest));
  }

  render() {
    const reportsListJsx = [];
    for (let i = 0; i < this.state.reports.length; i++) {
      // const car = this.state.reports[i].carInstance.car;

      reportsListJsx.push(
        <Row key={i} className="RentalListItem">
          <Col sm={12}></Col>
        </Row>
      );
    }

    if (!this.state.reportsFetched) {
      return <LoadingModal />;
    }

    return (
      <div className="Rentals-body">
        <Container>
          <Row className="RowMust Center" style={{ margin: "10px" }}>
            <Col sm={12}>
              <h1>
                {this.state.reports.length > 0
                  ? "Zgłoszone usterki"
                  : "Dla tego samochodu nie zgłoszono jeszcze usterki!"}
              </h1>
            </Col>
          </Row>
          <Row className="Row CarList d-flex justify-content-center">
            {reportsListJsx}
          </Row>
        </Container>
      </div>
    );
  }
}

export default ReportsList;
