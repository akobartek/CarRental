import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class FaultReportButton extends React.Component {
  render() {
    return (
      <Link to={`/reportForm/${this.props.rentalId}`}>
        <Button variant="primary">Zgłoś usterkę</Button>
      </Link>
    );
  }
}

export default FaultReportButton;
