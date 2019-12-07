import React from "react";
import { Button } from "react-bootstrap";

class FilterButton extends React.Component {
  refreshPage = () => {
    const {
      dateFrom,
      dateTo,
      locationIdFrom,
      horsePower,
      carType,
      passengers,
      gearbox
    } = this.props.state;

    window.location.replace(
      `/search?dateFrom=${dateFrom.toISOString().substring(0, 10)}` +
        `&dateTo=${dateTo.toISOString().substring(0, 10)}` +
        `&locationIdFrom=${locationIdFrom}` +
        `${carType !== "" ? `&carType=${carType}` : ``}` +
        `${passengers !== "" ? `&passengers=${passengers}` : ``}` +
        `${gearbox !== "" ? `&gearbox=${gearbox}` : ``}` +
        `${horsePower.min !== 0 ? `&horsePowerFrom=${horsePower.min}` : ``}` +
        `${horsePower.max !== 500 ? `&horsePowerTo=${horsePower.max}` : ``}`
    );
  };

  render() {
    return (
      <div>
        <Button variant="secondary" onClick={this.refreshPage}>
          Filtruj
        </Button>
      </div>
    );
  }
}

export default FilterButton;
