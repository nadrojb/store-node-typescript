function convertPrice(currency: string, input: number): number {
  if (currency == "GBP") {
    return Number(input.toFixed(2));
  } else if (currency == "EUR") {
    let result = input * 1.2;
    return result.toFixed(2);
  } else if (currency == "USD") {
    let result = input * 1.27;
    return result.toFixed(2);
  } else if (currency == "YEN") {
    let result = input * 190.79;
    return result.toFixed(2);
  }
}

module.exports = { convertPrice };