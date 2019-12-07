class ReportRequest {
  constructor(
    rentalId,
    flatTire,
    inefficientEngine,
    dischargedAccumulator,
    brokenBreaks,
    brokenGear,
    otherCritical,
    noLights,
    scratch,
    outOfLiquid,
    oldWipers,
    brokenAC,
    otherNotCritical,
    image
  ) {
    this.rentalId = rentalId;
    this.flatTire = flatTire;
    this.inefficientEngine = inefficientEngine;
    this.dischargedAccumulator = dischargedAccumulator;
    this.brokenBreaks = brokenBreaks;
    this.brokenGear = brokenGear;
    this.otherCritical = otherCritical;
    this.noLights = noLights;
    this.scratch = scratch;
    this.outOfLiquid = outOfLiquid;
    this.oldWipers = oldWipers;
    this.brokenAC = brokenAC;
    this.otherNotCritical = otherNotCritical;
    this.image = image;
  }
}

export default ReportRequest;
