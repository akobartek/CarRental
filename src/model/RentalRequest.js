class RentalRequest {
  constructor(
    carInstanceId,
    tokenWithUserId,
    carRentalUnitStartId,
    carRentalUnitEndId,
    dateFrom,
    dateTo,
    costPerDay
  ) {
    this.carInstanceId = carInstanceId;
    this.tokenWithUserId = tokenWithUserId;
    this.carRentalUnitStartId = carRentalUnitStartId;
    this.carRentalUnitEndId = carRentalUnitEndId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.costPerDay = costPerDay;
  }
}

export default RentalRequest;
