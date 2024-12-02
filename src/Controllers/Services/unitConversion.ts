function convertUnit(unit: string, input: number): string {
  if (unit == "mm") {
    return input.toString();
  } else if (unit == "cm") {
    let result = input * 0.1;
    return result.toFixed(2);
  } else if (unit == "in") {
    let result = input * 0.0393701;
    return result.toFixed(2);
  } else if (unit == "ft") {
    let result = input * 0.00328084;
    return result.toFixed(2);
  }
}

module.exports = { convertUnit };
