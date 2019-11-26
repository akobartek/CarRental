import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class ReservationButton extends React.Component {
  render() {
    const {
      selectedCar,
      dateFrom,
      dateTo,
      locationIdFrom,
      locationIdTo
    } = this.props;

    return (
      <Link
        to={{
          pathname: "/reservation",
          search:
            `?dateFrom=${dateFrom.toISOString().substring(0, 10)}` +
            `&dateTo=${dateTo.toISOString().substring(0, 10)}` +
            `&locationIdFrom=${locationIdFrom}` +
            `&locationIdTo=${locationIdTo}`,
          state: {
            selectedCar: selectedCar
          }
        }}
      >
        <Button variant="light">Rezerwuj</Button>
      </Link>
    );
  }
}

export default ReservationButton;
