class AddCarRequest {
  constructor(
    color,
    gearBox,
    horsePower,
    is4x4,
    isAirConditioning,
    isCabrio,
    isGPS,
    brand,
    model,
    normalCost,
    passengers,
    type,
    vin,
    registrationNumber,
    isUsable,
    carRentalUnit
  ) {
    this.color = color;
    this.gearBox = gearBox;
    this.horsePower = horsePower;
    this.is4x4 = is4x4;
    this.isAirConditioning = isAirConditioning;
    this.isCabrio = isCabrio;
    this.isGPS = isGPS;
    this.brand = brand;
    this.model = model;
    this.normalCost = normalCost;
    this.passengers = passengers;
    this.type = type;
    this.vin = vin;
    this.registrationNumber = registrationNumber;
    this.isUsable = isUsable;
    this.carRentalUnit = carRentalUnit;
  }
}

export default AddCarRequest;
