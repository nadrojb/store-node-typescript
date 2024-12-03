export function convertPrice(currency: "GBP" | "EUR" | "USD" | "YEN", input: number) {
  
  if (isNaN(input) || input < 0) {
    throw new Error("Invalid input: must be a number and not negative.");
  }

  if (currency == "GBP") {
    return input.toFixed(2);
  } else if (currency == "EUR") {
    let result = input * 1.2;
    return result.toFixed(2);
  } else if (currency == "USD") {
    let result = input * 1.27;
    return result.toFixed(2);
  } else if (currency == "YEN") {
    let result = input * 190.79;
    return result.toFixed(0);
  }
}
