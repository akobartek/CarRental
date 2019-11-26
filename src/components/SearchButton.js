import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class SearchResult extends React.Component {
  render() {
    const {
      dateFrom,
      dateTo,
      locationIdFrom,
      locationIdTo,
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
          `${locationIdTo ? `&locationIdTo=${locationIdTo}` : ``}` +
          `${carType ? `&carType=${carType}` : ``}` +
          `${passengers ? `&passengers=${passengers}` : ``}` +
          `${gearbox ? `&gearbox=${gearbox}` : ``}`
        }
      >
        <Button variant="primary">Szukaj</Button>
      </Link>
    );
  }
}

export default SearchResult;
