import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class SearchResult extends React.Component {
  render() {
    const {
      dateFrom,
      dateTo,
      locationIdFrom,
      horsePower,
      carType,
      passengers,
      gearbox
    } = this.props.state;

    return (
      <Link
        to={
          `/search?dateFrom=${dateFrom.toISOString().substring(0, 10)}` +
          `&dateTo=${dateTo.toISOString().substring(0, 10)}` +
          `&locationIdFrom=${locationIdFrom}` +
          `${carType !== "" ? `&carType=${carType}` : ``}` +
          `${passengers !== "" ? `&passengers=${passengers}` : ``}` +
          `${gearbox !== "" ? `&gearbox=${gearbox}` : ``}` +
          `${horsePower.min !== 0 ? `&horsePowerFrom=${horsePower.min}` : ``}` +
          `${horsePower.max !== 500 ? `&horsePowerTo=${horsePower.max}` : ``}`
        }
      >
        <Button variant="primary">Szukaj</Button>
      </Link>
    );
  }
}

export default SearchResult;
