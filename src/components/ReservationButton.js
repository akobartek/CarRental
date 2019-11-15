import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class ReservationButton extends React.Component {
  render() {
    const { carId, startDate, endDate, startCity, endCity } = this.props;

    return (
      <Link
        to={
          `/reservation?carId=${carId}` +
          `&startDate=${startDate.toISOString().substring(0, 10)}` +
          `&endDate=${endDate.toISOString().substring(0, 10)}` +
          `&startCity=${startCity}` +
          `&endCity=${endCity}`
        }
      >
        <Button variant="light">Rezerwuj</Button>
      </Link>
    );
  }
}

export default ReservationButton;
