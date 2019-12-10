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
      const report = this.state.reports[i];
      let reportDescription = "";
      if (report.description != null) reportDescription = report.description;
      else
        switch (report.type) {
          case "Flat_Tire":
            reportDescription = "Pęknięta opona";
            break;
          case "Inefficient_Engine":
            reportDescription = "Niesprawny silnik";
            break;
          case "Discharged_Accumulator":
            reportDescription = "Wyładowany akumulator";
            break;
          case "Broken_Breaks":
            reportDescription = "Awaria hamulców";
            break;
          case "Broken_Gear":
            reportDescription = "Awaria sprzęgła";
            break;
          case "No_Lights":
            reportDescription = "Awaria świateł";
            break;
          case "Scratch":
            reportDescription = "Zarysowanie";
            break;
          case "Out_Of_Liquids":
            reportDescription = "Brak płynów";
            break;
          case "Old_Wipers":
            reportDescription = "Zużyte wycieraczki";
            break;
          case "Broken_AC":
            reportDescription = "Awaria klimatyzacji";
            break;
          default:
            reportDescription = "Opis usterki niedostępny";
            break;
        }

      reportsListJsx.push(
        <Row key={i} className="RentalListItem">
          <Col sm={12}>
            <div className="ColumnWhole d-flex flex-column">
              <Row className="RowEnd d-flex align-item-start justify-content-end">
                <h5>
                  Data zgłoszenia:
                  {" " + report.date}
                </h5>
              </Row>
              <Row className="RowMust CarListName d-flex align-items-center flex-grow-1">
                <Col sm={12}>
                  <h2>{reportDescription}</h2>
                </Col>
              </Row>
            </div>
          </Col>
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
