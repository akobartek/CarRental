import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class SearchResult extends React.Component {
  render() {
    const {
      startDate,
      endDate,
      startCity,
      endCity,
      carType,
      passengers,
      gearbox
    } = this.props.state;

    return (
      <Link
        to={
          `/search?startDate=${startDate.toISOString().substring(0, 10)}` +
          `&endDate=${endDate.toISOString().substring(0, 10)}` +
          `&startCity=${startCity}` +
          `${endCity ? `&endCity=${endCity}` : ``}` +
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
